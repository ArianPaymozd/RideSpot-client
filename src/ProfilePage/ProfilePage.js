import React from 'react'
import ApiContext from '../ApiContext'
import TokenService from '../services/token-service'
import config from '../config'
import './ProfilePage.css'

export default class ProfilePage extends React.Component {
    
    state = {
        posts: [],
        info: [],
        userName: '',
        notFound: false
    }
    static contextType = ApiContext
    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/posts/${window.localStorage.getItem('user_id')}`, {
            method: 'GET',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({
                posts: res
            })
        })
        fetch(`${config.API_ENDPOINT}/users/${window.localStorage.getItem('user_id')}`, {
            method: 'GET',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                userName: res.user_name
            })
        })
    }
    
    // handleFilter = (e) => {
    //     e.preventDefault()
    //     const originalPosts = this.context.posts
    //     const location = Filters.filterLocation(originalPosts, e.target['city'].value)
    //     const sport = Filters.filterSport(location, e.target['sport-select'].value)
    //     const difficulty = Filters.filterDifficulty(sport, e.target['difficulty-select'].value)
    //     const security = Filters.filterDifficulty(difficulty, e.target['security-level'].value)
    //     this.setState({
    //         posts: security,
    //         notFound: security.length > 0 ? false : true
    //     })
    // }

    handleInfo = (postId) => {
        if (this.state.info.includes(postId)) {
            this.setState({
                info: this.state.info.filter(id => id !== postId)
            })
        } else {
            this.setState({
                info: [...this.state.info, postId]
            })
        }
        console.log(this.state.info)
    }

    render() {
        const postList = this.state.posts.map((post, idx) => {
            const title = post.title.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
            return (
                <li className='post-item' key={idx}>
                    <header className="post-header" >{title}</header>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Globe_Skateboard.jpg/1200px-Globe_Skateboard.jpg" alt={post.title} />
                    {
                        this.state.info.includes(post.post_id)
                        ? <div>
                            <p>Sport: {post.sport}</p>
                            <p>Description: {post.spot_description}</p>
                            <p>Difficulty: {post.difficulty}</p>
                            <p>Security: {post.security_level}</p>
                            <address>Address: {post.spot_address}</address>
                        </div>
                        : ''
                    }
                    <button className="info-button" onClick={() => this.handleInfo(post.post_id)}>{this.state.info.includes(post.post_id) ? "less..." : "more..."}</button>
                </li>
            )
        })
        const list = () => {
            if (!this.state.notFound) {
                return (<ul>{postList}</ul>)
            } else {
                return <h4>No posts yet</h4>
            }
        }
        return (
            <>
                <header className="username" ><p className="username-text" >{this.state.userName}</p></header>
                {list()}
            </>
        )
    }
}