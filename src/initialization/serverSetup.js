import dotenv from 'dotenv'
import DBstart from './database.js'
import router from '../routes/auth.routes.js'

dotenv.config()

const PORT = process.env.SERVER_PORT

const serverSetup = async (app) => {
  await DBstart()
  app.use('/api/auth', router)
  return app.listen(PORT, () => console.log(`started on port ${PORT}`))
}

export default serverSetup
