import Alumni from '../models/Alumni.js'


export const getAlumni = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const year = req.query.year

    const filter = {}

    if (year) {
      filter['graduate_profile.year_of_graduation'] = Number(year)
    }

    const skip = (page - 1) * limit

    const [items, total, years] = await Promise.all([
      Alumni.find(filter)
        .sort({ 'graduate_profile.year_of_graduation': -1 })
        .skip(skip)
        .limit(limit),

      Alumni.countDocuments(filter),

      // 🔥 ВСЕ ГОДЫ ИЗ БАЗЫ
      Alumni.distinct('graduate_profile.year_of_graduation')
    ])

    res.json({
      items,
      years: years
        .filter(Boolean)
        .sort((a, b) => b - a),

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



// GET by id
export const getAlumniById = async (req, res) => {
  try {
    const person = await Alumni.findById(req.params.id)
    if (!person) {
      return res.status(404).json({ message: 'Alumni not found' })
    }
    res.json(person)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

// CREATE
export const createAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.create(req.body)
    res.status(201).json(alumni)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

// UPDATE (все поля из body)
export const updateAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndUpdate(
      req.params.id,
      req.body,          // 👈 всё что пришло — обновляем
      {
        new: true,       // вернуть обновлённый объект
        runValidators: true
      }
    )

    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' })
    }

    res.json(alumni)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

// DELETE
export const deleteAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndDelete(req.params.id)

    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' })
    }

    res.json({ message: 'Alumni deleted successfully' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
