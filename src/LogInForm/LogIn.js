import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import AuthApiService from '../services/auth-service'

export default class LoginForm extends Component {
  state = { error: null, loading: false }

  static contextType = ApiContext

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null, loading: true })
    const { user_name, password } = ev.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        window.localStorage.setItem('user_id', res.user_id)
        this.context.handleLoginSuccess(res.user_id)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    console.log(this.context)
    return this.state.loading && !this.state.error ? (<div className="loading"></div>) :(
      <form
          className='LoginForm'
          onSubmit={this.handleSubmitJwtAuth}
      >
          <div className="alert" role='alert'>
              {error && <p className='alert-text'>Incorrect username or password</p>}
          </div>
          <div className="login">
              <input
                  required
                  className='user_name'
                  name='user_name'
                  id='LoginForm__user_name'
                  placeholder="User name"
                  aria-label="Username" />
              <input
                  required
                  className='password'
                  name='password'
                  type='password'
                  id='LoginForm__password'
                  placeholder="Password"
                  aria-label="Password" />
          </div>
          <div className="login-button">
              <button type='submit' className="login-buttons" aria-label="log in button">
                 Login
              </button>
          </div>
          <div className="register-message"><h4 >Don't have an account? Register now!</h4></div>
              <Link className="register-button" to='/register'>
                  <button className="login-buttons" onClick={this.props.onRegsiter} aria-label="register button">
                      Register
                  </button>
              </Link>
      </form>
    )
  }
}