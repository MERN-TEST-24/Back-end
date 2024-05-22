import { Router } from 'express'
import Subject_ from '../models/Subject_.js'
const subjectRouter = Router()

// /api/subject/add
subjectRouter.post('/add', async (req, res) => {
  try {
    const { subject_name } = req.body
    const subject = new Subject_({ subject_name })
    await subject.save()
    res.status(201).json({ message: 'subject addet' })
  } catch (err) {
    res.status(500).json({ message: 'subject addet error' })
  }
})

export default subjectRouter
