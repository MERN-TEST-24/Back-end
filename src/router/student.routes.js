import { Router } from 'express'
import Student from '../models/Student.js'
const studentRouter = Router()

// /api/student/add
studentRouter.post('/add', async (req, res) => {
  try {
    const { lastName, group_name } = req.body
    const student = new Student({ lastName, group_name })
    await student.save()
    res.status(201).json({ message: 'student addet' })
  } catch (err) {
    res.status(500).json({ message: 'student addet error' })
  }
})

export default studentRouter
