import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import {
  Home,
  Game,
  Login,
  Register
} from '../../container'
import Styles from './style.scss'

class Router extends React.PureComponent {
  render() {
    return (
      <div className={Styles.container} id="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/login" component={Login} />
          <Route exaxt path="/register" component={Register} />
        </Switch>
      </div>
    )
  }
}
export default withRouter(Router)
