import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login'
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular'
import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
// action for update state
import { SetUser } from '../../action'
// import TiSocialGoogleCircular from 'react-icons/lib/ti/social-google-plus-circular'
import secret from './secret'
import style from './style.scss'

class Login extends Component {
  constructor() {
    super()
    this.state = { isAuthenticated: false, user: null }
    this.googleResponse = this.googleResponse.bind(this)
    this.facebookResponse = this.facebookResponse.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      email: '',
      password: '',
      message: ''
    }
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    const tokenBlob = new Blob([JSON.stringify({ email, password }, null, 2)], { type: 'application/json' })
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    }
    fetch('/auth/local/login/', options)
      .then((result) => {
        if (result.status === 401)
          this.props.history.push('/register')
        else {
          localStorage.setItem('jwtToken', result.headers.get('x-auth-token'))
          result.json().then((user) => {
            if (localStorage.getItem('jwtToken')) {
              this.props.history.push('/')
              this.props.SetUser(user)
            }
          })
        }
      })
  }
  googleResponse(response) {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' })
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    }
    fetch(`${window.location.origin}/auth/google`, options).then((result) => {
      localStorage.setItem('jwtToken', result.headers.get('x-auth-token'))
      result.json().then((user) => {
        if (localStorage.getItem('jwtToken')) {
          this.props.SetUser(user)
          this.props.history.push('/')
        }
      })
    })
  }
  facebookResponse(response) {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' })
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    }
    fetch(`${window.location.origin}/auth/facebook`, options).then((result) => {
      localStorage.setItem('jwtToken', result.headers.get('x-auth-token'))
      result.json().then((user) => {
        if (localStorage.getItem('jwtToken')) {
          this.props.SetUser(user)
          this.props.history.push('/')
        }
      })
    })
  }
  render() {
    const Failure = (error) => {
      alert(error)
    }
    const { email, password, message } = this.state
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit}>
          {message !== '' &&
            <div className="alert alert-warning alert-dismissible" role="alert">
              {message}
            </div>
          }
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" className="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
          <p>
            Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
          </p>
        </form>
        <GoogleLogin
          clientId={secret.Google.client_ID}
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={Failure}
        />
        <FacebookLogin
          appId={secret.Facebook.app_ID}
          fields="name,email,picture"
          callback={this.facebookResponse}
          textButton="login with Facebook"
          cssClass={style.kep_login_facebook}
          size="small"
          icon={<TiSocialFacebookCircular />}
        />
      </div >
    )
  }
}
const mapStateToProps = state => ({
  user: state.reducerUser.user,
  isAuthenticated: state.reducerUser.isAuthenticated
})
const mapDispatchToProps = dispatch => ({
  SetUser: (user) => {
    dispatch(SetUser(user))
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
