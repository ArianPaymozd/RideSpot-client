import React, { Component, Suspense, lazy } from 'react'
import ApiContext from '../ApiContext'
import { Section } from '../Utils/Utils'
import './Login.css'

const LoginForm = lazy(() => import('../LogInForm/LogIn'))

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  static contextType = ApiContext

  handleLoginSuccess = () => {
    const { history } = this.props
    const destination = `/${window.localStorage.getItem('user_id')}`
    history.push(destination)
  }

  handleRegister = () => {
    const { history } = this.props
    const destination = `/register`
    history.push(destination)
  }

  render() {
    return (
      <div className="login-center">
        <Section className='LoginPage'>
          <h2>Login</h2>
          <Suspense fallback={<div>Loading...</div>} >
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
            onRegister={this.handleRegister}
          />
          </Suspense>
        </Section>
      </div>
    )
  }
}