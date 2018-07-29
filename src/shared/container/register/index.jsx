import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login'
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular'
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
// action for update state
import { SetUser } from '../../action'
import secret from '../login/secret/'
import style from './style.scss'

class Register extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.googleResponse = this.googleResponse.bind(this)
    this.facebookResponse = this.facebookResponse.bind(this)
    this.state = {
      email: '',
      username: '',
      password: ''
    }
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { email, username, password } = this.state
    const tokenBlob = new Blob([JSON.stringify({email,username,password}, null, 2)], { type: 'application/json' });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    }
    fetch('/auth/local/register/', options)
      .then((result) => {
        if(result.status ===401)
        this.props.history.push('/login')
        else{
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
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
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
          this.props.history.push('/')
          this.props.SetUser(user)
        }
      })
    })
  }
  facebookResponse(response) {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
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
          this.props.history.push('/')
          this.props.SetUser(user)

        }
      })
    })
  }
  render() {
    const { email, username, password } = this.state
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit}>
          <h2 className="form-signin-heading">Register</h2>
          {/* for email */}
          <label htmlFor="email" className="sr-only">Email address</label>
          <input type="email" className="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} required />
          {/* for user name */}
          <label htmlFor="username" className="sr-only">User Name</label>
          <input type="text" className="form-control" placeholder="User Name" name="username" value={username} onChange={this.onChange} required />
          {/* for password */}
          <label htmlFor="password" className="sr-only">Password</label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required />
          {/* submit */}
          <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
        <GoogleLogin
          clientId={secret.Google.client_ID}
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={(err) => { alert(err) }}
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
      </div>
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
)(Register)
