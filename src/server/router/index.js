import {
  ReactApp
} from './get'
import authApp from './auth'
import {
  UserModel as User
} from '../data/model'

function initRoutes(app) {
  app.use('/auth', authApp)
  app.get('/top', (req, res) => {
    User.find().sort({
      rating: 1
    }).limit(5).exec((err, document) => {
      console.log(document)
      res.json(document)

    })
  })
  app.get('*', ReactApp)
}

export default initRoutes
