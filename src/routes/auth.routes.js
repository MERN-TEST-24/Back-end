import { Router } from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const router = Router()

dotenv.config()

// /api/auth/register
router.post(
  '/register',
  [check('email', 'invalid e-mail').isEmail(), check('password', 'invalid password ').isLength({ min: 6 })],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'invalid data'
        })
      }
      const { email, password } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'this e-mail has already been registered' })
      }

      const heshedPassword = await bcrypt.hash(password, 12)

      const user = new User({ email, password: heshedPassword })

      await user.save()

      res.status(201).json({ message: 'user created ' })
    } catch (err) {
      res.status(500).json({ message: 'register error' })
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'invalid e-mail').normalizeEmail().isEmail(),
    check('password', 'invalid password ').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'invalid data'
        })
      }
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'invalid data' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'invalid data' })
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

      res.json({ token, userId: user.id })
    } catch (err) {
      res.status(500).json({ message: 'login error' })
    }
  }
)
export default router
