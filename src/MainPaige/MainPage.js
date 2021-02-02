import React from 'react'
import AuthApiService from '../services/auth-service'

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
        return (
            <div>
                <header role="banner">
                    <h1>RideSpot</h1>
                    <h2>Find your place.</h2>
                </header>
                <section>
                    <header>
                        <h3>What we do</h3>
                    </header>
                    <p>[<em>placeholder for screenshot of spot list</em>]</p>
                    <p>RideSpot is a community of riders who post their favorite spots to try and hurt themselves. Because the fall isn't fun if no one's there to see it right?</p>
                </section>
                <section>
                    <header>
                        <h3>Share your favorite spots</h3>
                    </header>
                    <p>[<em>placeholder for screenshot of spot upload interface</em>]</p>
                    <p>Have somewhere you love to skate, bike, scooter, or rollerblade? Well dont keep it to yourself! Post it here and share it with the people. But make sure you add the security level and difficulty so we dont get arrested,  or you know... break everything.</p>
                </section>
                <section>
                    <header>
                        <h3>Discover New Spots</h3>
                    </header>
                    <p>[<em>placeholder for screenshot of filtered spot list</em>]</p>
                    <p>We all know the best rail in the world is the one at your high school, but there still might be a better one out there right? With ride spot you can find that new rail and much more. Sort through our communities list of spots by sport, difficulty, and security level to discover your new favorite place to hurt yourself.</p>
                </section>
                <section>
                    <header>
                        <h3>Sign Up Now</h3>
                    </header>
                    <form className='signup-form' onSubmit={this.handleSubmit}>
                        <div>
                        <label htmlFor="full_name">Full name</label>
                        <input placeholder='Max Smith' type="text" name='full_name' id='full_name' />
                        </div>
                        <div>
                        <label htmlFor="user_name">Username</label>
                        <input type="text" name='user_name' id='user_name' />
                        </div>
                        <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' id='email' />
                        </div>
                        <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' id='password' />
                        </div>
                        <button type='submit'>Sign Up</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default MainPaige