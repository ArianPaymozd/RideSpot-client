import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import TokenService from '../services/token-service'

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
              spot_address: `${e.target['spot-address'].value} ${e.target['spot-city'].value}, ${e.target['spot-state'].value} ${e.target['spot-zipcode'].value}`,
              difficulty: this.state.difficulty,
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

    handleRadioButton = (e) => {
        this.setState({
            difficulty: e.target.value
        })
    }

    render() {
        return (
            <div>
                <section>
                    <form id="new-spot" onSubmit={this.handlePost}>
                    <section className="form-section overview-section">
                        <label htmlFor="spot-title">Spot title</label>
                        <input type="text" name="spot-title" placeholder="El-toro 20 stair" required />
                    </section>
                    <section className="form-section overview-section">
                        <label htmlFor="spot-picture">Add picture</label>
                        <input type="text" name="spot-picture" required />
                    </section>
                    <section className="form-section overview-section">
                        <label htmlFor="spot-state">State</label>
                        <input type="text" name="spot-state" placeholder="NY" required />
                        <label htmlFor="spot-city">City</label>
                        <input type="text" name="spot-city" placeholder="New York" required />
                        <label htmlFor="spot-address">Address line</label>
                        <input type="text" name="spot-address" />
                        <label htmlFor="spot-zipcode">Zipcode</label>
                        <input type="text" name="spot-zipcode" />
                    </section>
                    <section className="form-section overview-section">
                        <label htmlFor="spot-description">Spot Description</label>
                        <textarea id="spot-description" name="spot-description" rows="15"></textarea>
                    </section>
                    <section className="form-section difficulty-section">
                        <h2>Select difficulty</h2>

                        <input type="radio" checked={this.state.difficulty === 'beginer'} onChange={this.handleRadioButton} name="difficulty" id="difficulty-easy" value="beginer" className="difficulty-level-radio" />
                        <label htmlFor="difficulty-easy">
                        <span>Beginer</span>
                        </label>
                        <br />
                        <input type="radio" checked={this.state.difficulty === 'intermediate'} onChange={this.handleRadioButton} name="difficulty" id="difficulty-medium" value="intermediate" className="difficulty-level-radio" />
                        <label htmlFor="difficulty-medium">
                        <span>Intermediate</span>
                        </label>
                        <br />
                        <input type="radio" checked={this.state.difficulty === 'expert'} onChange={this.handleRadioButton} name="difficulty" id="difficulty-hard" value="expert" className="difficulty-level-radio" />
                        <label htmlFor="difficulty-hard">
                        <span>Expert</span>
                        </label>
                        <br />
                        <input type="radio" checked={this.state.difficulty === 'bring a helmet'} onChange={this.handleRadioButton} name="difficulty" id="difficulty-expert" value="bring a helmet" className="difficulty-level-radio" />
                        <label htmlFor="difficulty-expert">
                        <span>Bring a helmet</span>
                        </label>
                        <br />
                        <input type="radio" checked={this.state.difficulty === `the helmet won't help`} onChange={this.handleRadioButton} name="difficulty" id="difficulty-pro" value="the helmet won't help" className="difficulty-level-radio" />
                        <label htmlFor="difficulty-pro">
                        <span>The helmet won't help</span>
                        </label>
                    </section>
                    <br />
                    <section className="form-section overview-section">
                        <label htmlFor="sport-select">Select Sport</label>
                        <select name="sport-select">
                        <option name="sport-bike" value="bike">Bike</option>
                        <option name="sport-skateboard" value="skateboard">Skateboard</option>
                        <option name="sport-scooter" value="scooter">Scooter</option>
                        <option name="sport-rollerblades" value="rollerblades">Rollderblades</option>
                        </select>
                    </section>
                    <section className="form-section overview-section">
                        <label htmlFor="security-level">Security level</label>
                        <select name="security-level">
                        <option name="security-none" value="none">none</option>
                        <option name="security-low" value="low">low</option>
                        <option name="security-medium" value="medium">medium</option>
                        <option name="security-high" value="high">high</option>
                        </select>
                    </section>
                    <section className="button-section">
                        <button type="submit">Submit</button>
                        <button type="reset">Reset</button>
                    </section>
                    </form>
                </section>
            </div>
        )
    }
}