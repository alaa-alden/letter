import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Router } from '../'
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
            href="https://cdn0.iconfinder.com/data/icons/marine-and-nautical-5/32/oxygen-air-water-bubble-bubbles-512.png"
            type="image/x-icon"
          />
        </Helmet>
        <div className="container-fluid">
          <Router />
        </div>
      </div>
    )
  }
}
export default App
