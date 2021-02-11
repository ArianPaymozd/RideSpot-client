import React, {Suspense, lazy} from 'react'
import {Link} from 'react-router-dom'
import AuthApiService from '../services/auth-service'
import addPost from './images/add-post[443].jpg'
import filterList from './images/filter-list[442].jpg'
import postList from './images/post-list[441].jpg'
import './MainPage.css'

const ImageSlider = lazy(() => import('./ImageSlider'))

class MainPaige extends React.Component {
    static defaultProps = {
        history: {
            push: () => {}
        }
    }

    state = {
        error: null,
        password: false
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { user_name, password, full_name, email } = e.target
        AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value,
            full_name: full_name.value,
            email: email.value,
        })
        .then(res => {
            AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value,
            })
            .then(res => {
                full_name.value = ''
                password.value = ''
                user_name.value = ''
                email.value = ''
                window.localStorage.setItem('user_id', res.user_id)
                this.props.history.push(`/${window.localStorage.getItem('user_id')}`)
            })
            .catch(res => {
                this.setState({error: res.error})
            })
        })
        .catch(res => {
            this.setState({error: res.error})
        })
    }

    handlePasswordDescription = () => {
        this.setState({
            password: true
        })
    }

    render() {
         const images = [postList, filterList, addPost]
        return (
            <div className="center">
                <div className="register-main" >
                    <Suspense fallback={<div ></div>}>
                        <ImageSlider images={images}/>
                    </Suspense>
                    <section className="signup-section">
                        <header className="sign-up">
                            <h2>Sign Up Now</h2>
                        </header>
                        <form className='signup-form' onSubmit={this.handleSubmit}>
                            {this.state.error && <p>{this.state.error}</p>}
                            <div>
                                <input className="signup-input" placeholder='Full name: John Smith' type="text" name='full_name' id='full_name' aria-label="full name" autoComplete="off" required />
                            </div>
                            <div>
                                <input className="signup-input" placeholder="Username: Jsmithy" type="text" name='user_name' id='user_name' aria-label="username" autoComplete="off" required />
                            </div>
                            <div>
                                <input className="signup-input" placeholder="Email: johnsmith@yahoo.com" type="text" name='email' id='email' aria-label="email" autoComplete="off" required />
                            </div>
                            <div className="password-register">
                                <input className="signup-input" placeholder="Password: AAaa123$" type="password" name='password' id='password' aria-label="password" autoComplete="off" onClick={this.handlePasswordDescription} required />
                                <br />
                                {this.state.password && <div className="password-label"><label htmlFor="password">Password must contain one upper case, lower case, number and special character</label></div>}
                            </div>
                            <div className="signup-buttons">
                                <button className="signup-button" name="signup-button" type='submit'>Sign Up</button>
                                <Link className="post-button-register-link" to='/posts'>
                                    <button className="post-button-register" aria-label="login button">
                                        View posts
                                    </button>
                                </Link>
                                <Link className="login-button-register-link" to='/login'>
                                    <button className="login-button-register" onClick={this.props.onRegsiter} aria-label="register button">
                                        Log in
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        )
    }
}

export default MainPaige