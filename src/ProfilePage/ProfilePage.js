import React from 'react'
import ApiContext from '../ApiContext'
import TokenService from '../services/token-service'
import config from '../config'
import './ProfilePage.css'
import AddPostPage from '../AddPost/AppPostPage'

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
            this.setState({
                posts: res.reverse()
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
    }

    handleState = (postId) => {
        const newPosts = this.state.posts.filter(post => {
            return post.post_id !== postId
        })
        this.setState({
            posts: newPosts
        })
    }

    handleDelete = (postId) => {
        fetch(`${config.API_ENDPOINT}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
              'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
        this.context.deletePost(postId)
        this.handleState(postId)
    }

    render() {
        const postList = this.state.posts.map((post, idx) => {
            const title = post.title.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
            return (
                <li className='post-item' key={idx}>
                    <header className="post-header-profile" ><div className="post-title">{title}</div> <button className="delete-button" aria-label="delete button" onClick={() => this.handleDelete(post.post_id)}>Delete</button></header>
                    <img src={post.img} alt={post.title} />
                    {
                        this.state.info.includes(post.post_id)
                        ? <div className="info">
                            <p>Sport: {post.sport}</p>
                            <p>Description: {post.spot_description}</p>
                            <p>Difficulty: {post.difficulty}</p>
                            <p>Security: {post.security_level}</p>
                            <address>Address: {post.spot_address}</address>
                        </div>
                        : ''
                    }
                    <button className="info-button" aria-label="info button" onClick={() => this.handleInfo(post.post_id)}>{this.state.info.includes(post.post_id) ? "less..." : "more..."}</button>
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
            <div className="Profile_page">
                <main className="Profile_main"><header className="username" ><p className="username-text">{this.state.userName}</p></header>{list()}</main>
                <main className="AddPost_main"><AddPostPage /></main>
            </div>
        )
    }
}