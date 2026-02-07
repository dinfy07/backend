import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { generateTokens } from '../utils/tokens.js'
import ExcelJS from "exceljs"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export const register = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, password, role } = req.body

    if (!first_name || !last_name || !phone_number || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const exists = await User.findOne({ phone_number })
    if (exists) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      first_name,
      last_name,
      phone_number,
      password: hash,
      role: role || 'user'
    })

    res.status(201).json({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      role: user.role
    })
  } catch (e) {
    console.error('REGISTER ERROR:', e)
    res.status(500).json({ message: 'Registration failed' })
  }
}

export const updateMe = async (req, res) => {
  try {
    const { password, ...rest } = req.body

    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // обновляем обычные поля
    Object.assign(user, rest)

    // 🔐 если меняют пароль
    if (password && password.length >= 6) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
    }

    await user.save()

    const result = user.toObject()
    delete result.password

    res.json(result)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json(user)
}

export const login = async (req, res) => {
  const { phone_number, password } = req.body

  const user = await User.findOne({ phone_number })
  if (!user) return res.status(401).json({ message: 'Invalid phone number' })

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return res.status(401).json({ message: 'Invalid password' })

  const { accessToken, refreshToken } = generateTokens({
    id: user._id,
    role: user.role
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true
  })

  res.json({ accessToken, user })
}

export const refresh = (req, res) => {
  try {
    const token = req.cookies.refreshToken
    if (!token) return res.sendStatus(401)

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET)

    const { accessToken } = generateTokens({
      id: payload.id,
      role: payload.role
    })

    // ❌ НЕ СТАВИМ res.cookie ЗДЕСЬ
    res.json({ accessToken })
  } catch (e) {
    console.error('REFRESH ERROR:', e)
    res.sendStatus(401)
  }
}

export const application = async (req, res) => {
  try {
    const { first_name, last_name, phone_number } = req.body

    const dirPath = path.join(__dirname, "../data")
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    // 🔒 НОВЫЙ ФАЙЛ НА КАЖДЫЙ ДЕНЬ
    const date = new Date().toISOString().split("T")[0]
    const filePath = path.join(dirPath, `applications-${date}.xlsx`)

    const workbook = new ExcelJS.Workbook()
    let sheet

    if (fs.existsSync(filePath)) {
      await workbook.xlsx.readFile(filePath)
      sheet = workbook.getWorksheet("Applications")
    }

    if (!sheet) {
      sheet = workbook.addWorksheet("Applications")
      sheet.columns = [
        { header: "Имя", key: "first_name", width: 20 },
        { header: "Фамилия", key: "last_name", width: 20 },
        { header: "Телефон", key: "phone_number", width: 20 },
        { header: "Дата", key: "created_at", width: 22 }
      ]
    }

    sheet.addRow({
      first_name,
      last_name,
      phone_number,
      created_at: new Date().toLocaleString()
    })

    await workbook.xlsx.writeFile(filePath)

    res.json({ message: "Заявка сохранена" })
  } catch (error) {
    console.error("EXCEL ERROR:", error)
    res.status(500).json({ message: "Ошибка сохранения" })
  }
}

export const logout = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    path: '/'
  })

  res.sendStatus(204)
}


