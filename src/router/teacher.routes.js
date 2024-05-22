import { Router } from 'express'
import Teacher from '../models/Teacher.js'
const teacherRouter = Router()

// /api/teacher/add
teacherRouter.post('/add', async (req, res) => {
  try {
    const { firstName, lastName } = req.body
    const teacher = new Teacher({ firstName, lastName })
    await teacher.save()
    res.status(201).json({ message: 'teacher addet' })
  } catch (err) {
    res.status(500).json({ message: 'teacher addet error' })
  }
})

export default teacherRouter
