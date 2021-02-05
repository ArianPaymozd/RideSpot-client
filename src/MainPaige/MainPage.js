import React from 'react'
import ImageSlider from './ImageSlider'
import AuthApiService from '../services/auth-service'
import addPost from './images/add-post[443].jpg'
import filterList from './images/filter-list[442].jpg'
import postList from './images/post-list[441].jpg'
import './MainPage.css'

class MainPaige extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const { user_name, password, full_name, email } = e.target
        AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value,
            full_name: full_name.value,
            email: email.value,
        })
        .then(user => {
            full_name.value = ''
            password.value = ''
            user_name.value = ''
            email.value = ''
        })
        .catch(res => {
            this.setState({error: res.error})
        })
    }

    

    render() {
         const images = [postList, filterList, addPost]
        return (
            <div className="center">
                <div className="register-main" >
                    <ImageSlider images={images}/>
                    <section className="signup-section">
                        <header className="sign-up">
                            <h4>Sign Up Now</h4>
                        </header>
                        <form className='signup-form' onSubmit={this.handleSubmit}>
                            <div>
                            <input className="signup-input" placeholder='Full name' type="text" name='full_name' id='full_name' />
                            </div>
                            <div>
                            <input className="signup-input" placeholder="Username" type="text" name='user_name' id='user_name' />
                            </div>
                            <div>
                            <input className="signup-input" placeholder="Email" type="text" name='email' id='email' />
                            </div>
                            <div>
                            <input className="signup-input" placeholder="Password" type="password" name='password' id='password' />
                            </div>
                            <button className="signup-button" type='submit'>Sign Up</button>
                        </form>
                    </section>
                </div>
            </div>
        )
    }
}

export default MainPaige