import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import AuthApiService from '../services/auth-service'
import { Button } from '../Utils/Utils'

export default class LoginForm extends Component {
  state = { error: null }

  static contextType = ApiContext

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
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
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div className="login">
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
          </label>
          <br />
          <input
            required
            className='user_name'
            name='user_name'
            id='LoginForm__user_name'
            placeholder="User name" />
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
          </label>
          <br />
          <input
            required
            className='password'
            name='password'
            type='password'
            id='LoginForm__password'
            placeholder="Password" />
        </div>
        <div className="login-button">
          <button type='submit' className="login-buttons">
            Login
          </button>
        </div>
        </div>
        <div className="register">
          <div className="register-message"><h4 >Don't have an account? Register now!</h4></div>
        <Link className="register-button" to='/register'>
        <button className="login-buttons">
          Register
        </button>
        </Link>
        </div>
      </form>
    )
  }
}