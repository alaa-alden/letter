import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
// import { DeleteUesr } from '../../action'
import styles from './styles.scss'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.Modle = this.Modle.bind(this)
    this.DeleteUser = this.DeleteUser.bind(this)
  }
  Modle() {
    if (this.props.isAuthenticated !== false)
      return (
        <Link to='/' className="btn btn-danger" onClick={this.DeleteUser}>
          logout
        </Link>
      )
    else {
      return (
        <Link to="/login" className="btn btn-primary btn-lg btn-block">login</Link>
      )
    }
  }
  DeleteUser() {
    localStorage.removeItem('jwtToken')
    this.props.DeleteUser()
  }
  render() {
    return (
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Link to='/'>
            <img src="https://res.cloudinary.com/dg2jsfnut/image/upload/v1532861188/longBest0.png" alt="logo" width={70} height={70} />
          </Link>
        </div>
        {/* <h1>Navigation</h1> */}
        <div className={styles.login_user}>
          {
            this.Modle()
          }
        </div>
      </div >
    )
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.reducerUser.isAuthenticated
})
const mapDispatchToprops = dispatch => ({
  DeleteUser: () => {
    dispatch({ type: 'Delete_User' })
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToprops
)(Navigation)
