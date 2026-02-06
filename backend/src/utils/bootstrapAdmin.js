import bcrypt from 'bcrypt'
import User from '../models/User.js'

export default async function bootstrapAdmin() {
  const adminExists = await User.findOne({ role: 'admin' })
  if (adminExists) {
    console.log('✅ Admin already exists')
    return
  }

  const hash = await bcrypt.hash(
    process.env.SUPER_ADMIN_PASSWORD,
    10
  )

  await User.create({
    first_name: process.env.SUPER_ADMIN_FIRST_NAME,
    last_name: process.env.SUPER_ADMIN_LAST_NAME,
    phone_number: process.env.SUPER_ADMIN_PHONE,
    password: hash,
    role: 'admin'
  })

  console.log('🚀 Super admin created')
}
