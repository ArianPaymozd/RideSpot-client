import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import LoginForm from '../LogInForm/LogIn'
import { Section } from '../Utils/Utils'

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

  render() {
    return (
      <Section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </Section>
    )
  }
}