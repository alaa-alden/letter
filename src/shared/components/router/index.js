import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import {
  Home
} from '../../container'
class Router extends React.PureComponent {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}
export default withRouter(Router)
