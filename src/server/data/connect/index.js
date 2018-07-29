import mongoose from 'mongoose'

import { keys } from '../../secret'

const connect = () => {
  const DB_URL = keys.mongodb.DB_URL
  mongoose.connect(DB_URL, { useNewUrlParser: true })
}
export default connect
