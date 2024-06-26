import { Schema, model } from 'mongoose'

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
})
const User = model('User', schema)

export default User
