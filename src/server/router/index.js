import { ReactApp } from './get'

function appRouteHandler(req, res) {
  ReactApp(req, res)
}
function initRoutes(app) {
  app.get('*', appRouteHandler)
}

export default initRoutes
