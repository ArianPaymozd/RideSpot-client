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
              difficulty: e.target['difficulty-select'].value,
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
            <div className="post-main">
                <section className="post-section" >
                    <div className="post-form">
                    <form id="new-spot" onSubmit={this.handlePost}>
                        <div className="main-info">
                            <div>
                                <section className="form-section overview-section-post" >
                                    <input className="title" type="text" name="spot-title" placeholder="Title" aria-label="Title" autoComplete="off" required />
                                </section>
                                <section className="form-section overview-section-post">
                                    <input className="picture-link" type="text" name="spot-picture" placeholder="Picture Link" onChange={this.handleImg} aria-label="Picture link" autoComplete="off" required />
                                </section>
                                <section className="form-section overview-section-post">
                                    <textarea id="spot-description" name="spot-description" placeholder="Description" aria-label="Description" required></textarea>
                                </section>
                            </div>
                            <div className="img">{this.state.img ? <img className="post-img" name="post image" src={this.state.img} alt=""/> : <p className="no-img">No image selected</p>}</div>
                        </div>
                    <section className="form-section overview-section-post">
                        <input className="address" type="text" name="spot-address" placeholder="Address" aria-label="Address" autoComplete="off" required />
                        <input className="address" type="text" name="spot-city" placeholder="City" aria-label="City" required />
                        <input className="address" type="text" name="spot-state" placeholder="State" aria-label="State" maxLength="2" required />
                        <input className="address" type="text" name="spot-zipcode"  placeholder="Zip" aria-label="Zip code" maxLength="5" required />
                    </section>
                    <div className="select">
                    <section className="form-select overview-section-post">
                        <select className="upload-select" name="difficulty-select" aria-label="difficulty select" defaultValue="DEFAULT" required >
                        <option className="post-option" name="sport-rollerblades" value="DEFAULT" disabled >Difficulty</option>
                        <option className="post-option" name="sport-bike" value="Beginer">Beginer</option>
                        <option className="post-option" name="sport-skateboard" value="Intermediate">Intermediate</option>
                        <option className="post-option" name="sport-scooter" value="Expert">Expert</option>
                        <option className="post-option" name="sport-rollerblades" value="Bring a helmet">Bring a helmet</option>
                        <option className="post-option" name="sport-rollerblades" value="The helmet won't help">The helmet won't help</option>
                        </select>
                    </section>
                    <section className="form-select overview-section-post">
                        <select className="upload-select" name="sport-select" aria-label="sport select" defaultValue="DEFAULT" required >
                        <option className="post-option" name="sport-select" value="DEFAULT" disabled >Sport</option>
                        <option className="post-option" name="sport-bike" value="Bike">Bike</option>
                        <option className="post-option" name="sport-skateboard" value="Skateboard">Skateboard</option>
                        <option className="post-option" name="sport-scooter" value="Scooter">Scooter</option>
                        <option className="post-option" name="sport-rollerblades" value="Rollerblades">Rollderblades</option>
                        </select>
                    </section>
                    <section className="form-select overview-section-post">
                        <select className="upload-select" name="security-level" aria-label="security select" defaultValue="DEFAULT" required>
                        <option className="post-option" name="security-level"value="DEFAULT" disabled >Security</option>
                        <option className="post-option" name="security-none" value="None">None</option>
                        <option className="post-option" name="security-low" value="Low">Low</option>
                        <option className="post-option" name="security-medium" value="Medium">Medium</option>
                        <option className="post-option" name="security-high" value="High">High</option>
                        </select>
                    </section>
                    </div>
                    <section className="button-section">
                        <button className="post-button" aria-label="post button" type="submit">Post</button>
                    </section>
                    </form>
                    </div>
                </section>
            </div>
        )
    }
}