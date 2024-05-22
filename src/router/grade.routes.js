import { Router } from 'express'
import Grade from '../models/Grade.js'
const gradeRouter = Router()

// /api/grade/add
gradeRouter.post('/add', async (req, res) => {
  try {
    const { ticket_number, grade_value, student_ID, subject_ID, teacher_ID } = req.body
    const grade = new Grade({ ticket_number, grade_value, student_ID, subject_ID, teacher_ID })
    await grade.save()
    res.status(201).json({ message: 'grade addet' })
  } catch (err) {
    res.status(500).json({ message: 'grade addet error' })
  }
})

export default gradeRouter
