import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import {
  Router,
  Footer,
  Navigation
} from '../'
import styles from './style.scss'

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>letter bubbels</title>
          <link
            rel="shortcut icon"
            href="https://res.cloudinary.com/dg2jsfnut/image/upload/v1532861188/longBest0.png"
            type="image/x-icon"
          />
        </Helmet>
        <Navigation />
        <Router />
        <Footer />
      </div>
    )
  }
}
export default App

