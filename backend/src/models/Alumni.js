import mongoose from 'mongoose'

const AlumniSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    patronymic: String,
    phone_number: String,
    about: String,
    photo_url: String,
    graduate_profile: {
      place_of_work: String,
      year_of_graduation: Number
    },
    contacts: {
      telegram: String,
      email: String
    },
    achievements: [
      {
        title: String,
        description: String
      }
    ]
  },
  { timestamps: true }
)

export default mongoose.model('Alumni', AlumniSchema)
