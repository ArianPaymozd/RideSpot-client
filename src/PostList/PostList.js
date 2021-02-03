import React from 'react'
import ApiContext from '../ApiContext'
import Filters from './Filters'
import './PostList.css'

export default class PostList extends React.Component {
    static contextType = ApiContext
    state = {
        posts: [],
        notFound: false,
        info: [],
    }
    
    handleFilter = (e) => {
        e.preventDefault()
        const originalPosts = this.context.posts
        const location = Filters.filterLocation(originalPosts, e.target['city'].value)
        const sport = Filters.filterSport(location, e.target['sport-select'].value)
        const difficulty = Filters.filterDifficulty(sport, e.target['difficulty-select'].value)
        const security = Filters.filterSecurity(difficulty, e.target['security-level'].value)
        console.log(e.target['security-level'].value)
        this.setState({
            posts: security,
            notFound: security.length > 0 ? false : true
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
        console.log(this.state.info)
    }

    render() {
        const filteredPostList = this.state.posts.map((post, idx) => {
            const title = post.title.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
            return (
                <li className='post-item' key={idx}>
                    <header className="post-header" >{title}</header>
                    <img src={post.img} alt={post.title} />
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
        const postList = this.context.posts.map((post, idx) => {
            const title = post.title.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
            return (
                <li className='post-item' key={idx}>
                    <header className="post-header" >{title}</header>
                    <img src={post.img} alt={post.title} />
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
                    <br />
                    <button className="info-button" onClick={() => this.handleInfo(post.post_id)}>{this.state.info.includes(post.post_id) ? "less..." : "more..."}</button>
                </li>
            )
        })
        const list = () => {
            if (!this.state.notFound) {
                return (<ul>{filteredPostList.length > 0 ? filteredPostList : postList}</ul>)
            } else {
                return <h4>No posts found, please lower your standards bud.</h4>
            }
        }
        return (
            <>
            <section className='filter-form'>
            <form className="form-section overview-section" onSubmit={this.handleFilter}>
                <select className="filter" name="sport-select">
                <option name="sport-none" value={null}>Sport</option>
                <option name="sport-skateboard" value="skateboard">Skateboard</option>
                <option name="sport-bike" value="bike">Bike</option>
                <option name="sport-scooter" value="scooter">Scooter</option>
                <option name="sport-rollerblades" value="rollerblades">Rollderblades</option>
                </select>
                <select className="filter" name="difficulty-select">
                <option name="difficulty-none" value={null}>Difficulty</option>
                <option name="difficulty-beginer" value="beginer">beginner</option>
                <option name="difficulty-intermediate" value="intermediate">intermediate</option>
                <option name="difficulty-hard" value="expert">expert</option>
                <option name="difficulty-expert" value="bring a helmet">Bring a helmet</option>
                <option name="difficulty-pro" value="the helmet won't help">The helmet won't help</option>
                </select>
                <select className="filter" name="security-level">
                <option name="security-none" value={null}>Security</option>
                <option name="security-none" value="none">none</option>
                <option name="security-low" value="low">low</option>
                <option name="security-medium" value="medium">medium</option>
                <option name="security-high" value="high">high</option>
                </select>
                <input type="text" className="city-search" name="city" id="city-search" placeholder="Search City"/>
                <button type='submit' className='search-button' >SEARCH</button>
            </form>
            </section>

            {list()}
            
            </>
        )
    }
}