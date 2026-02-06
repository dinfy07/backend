import User from '../models/User.js'
import bcrypt from 'bcryptjs'

// GET ALL
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [items, total] = await Promise.all([
      User.find().select('-password').skip(skip).limit(limit),
      User.countDocuments()
    ])

    res.json({
      items,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}


export const updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // 🔁 обновляем обычные поля
    Object.assign(user, rest)

    // 🔐 если передан пароль — обновляем его
    if (password && password.length >= 6) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
    }

    await user.save()

    // ❗️не возвращаем пароль
    const userResponse = user.toObject()
    delete userResponse.password

    res.json(userResponse)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ message: 'User deleted successfully' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
// GET user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
