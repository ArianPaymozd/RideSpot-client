import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import TokenService from '../services/token-service'
import './AddPost.css'

export default class AddPost extends React.Component {

    static defaultProps = {
        postSuccess: () => {}
    }

    state = {
        difficulty: ''
    }

    static contextType = ApiContext

    handlePost = (e) => {
        e.preventDefault()
        console.log(window.localStorage.getItem('user_id'))
        fetch(`${config.API_ENDPOINT}/posts`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
              user_id: window.localStorage.getItem('user_id'),
              title: e.target['spot-title'].value,
              sport: e.target['sport-select'].value,
              spot_description: e.target['spot-description'].value,
              spot_address: `${e.target['spot-address'].value}, ${e.target['spot-city'].value}, ${e.target['spot-state'].value} ${e.target['spot-zipcode'].value}`,
              difficulty: e.target['difficulty-select'],
              security_level: e.target['security-level'].value,
              img: e.target['spot-picture'].value,
            }),
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
        .then(json => {
            console.log(json)
            this.context.addPost(json)
            this.props.postSuccess()
        })
    }

    handleImg = (e) => {
        this.setState({
            img: e.target.value
        })
    }

    render() {
        return (
            <div>
                <section className="post-section" >
                    <div className="post-form">
                    <form id="new-spot" onSubmit={this.handlePost}>
                        <div className="main-info">
                            <div>
                                <section className="form-section overview-section">
                                    <input type="text" name="spot-title" placeholder="Title" required />
                                </section>
                                <section className="form-section overview-section">
                                    <input type="text" name="spot-picture" placeholder="Picture Link" onChange={this.handleImg} required />
                                </section>
                                <section className="form-section overview-section">
                                    <textarea id="spot-description" name="spot-description" placeholder="Description"></textarea>
                                </section>
                            </div>
                            <div className="img">{this.state.img ? <img className="post-img" src={this.state.img} alt=""/> : <p className="no-img">No image selected</p>}</div>
                        </div>
                    <section className="form-section overview-section">
                        <input type="text" name="spot-address" placeholder="Address" />
                        <input type="text" name="spot-city" placeholder="City" required />
                        <input type="text" name="spot-state" placeholder="State" required />
                        <input type="text" name="spot-zipcode"  placeholder="Zip" />
                    </section>
                    <div className="select">
                    <section className="form-select overview-section">
                        <select name="difficulty-select">
                        <option name="sport-rollerblades" value="" disabled selected>Difficulty</option>
                        <option name="sport-bike" value="bike">Beginer</option>
                        <option name="sport-skateboard" value="skateboard">Intermediate</option>
                        <option name="sport-scooter" value="scooter">Expert</option>
                        <option name="sport-rollerblades" value="rollerblades">Bring a helmet</option>
                        <option name="sport-rollerblades" value="rollerblades">The helmet wont help</option>
                        </select>
                    </section>
                    <section className="form-select overview-section">
                        <select name="sport-select">
                        <option name="sport-select" disabled selected>Sport</option>
                        <option name="sport-bike" value="bike">Bike</option>
                        <option name="sport-skateboard" value="skateboard">Skateboard</option>
                        <option name="sport-scooter" value="scooter">Scooter</option>
                        <option name="sport-rollerblades" value="rollerblades">Rollderblades</option>
                        </select>
                    </section>
                    <section className="form-select overview-section">
                        <select name="security-level">
                        <option name="security-level" disabled selected>Security</option>
                        <option name="security-none" value="none">none</option>
                        <option name="security-low" value="low">low</option>
                        <option name="security-medium" value="medium">medium</option>
                        <option name="security-high" value="high">high</option>
                        </select>
                    </section>
                    </div>
                    <section className="button-section">
                        <button className="post-button" type="submit">Post</button>
                    </section>
                    </form>
                    </div>
                </section>
            </div>
        )
    }
}