import React, { Suspense, lazy } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { faSnowboarding, faUserCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-service'
import IdleService from '../services/idle-service'

const MainPaige = lazy(() => import('../MainPaige/MainPage'))
const LoginPage = lazy(() => import('../LogInPage/LogInPage'))
const PostList = lazy(() => import('../PostList/PostList'))
const AddPostPage = lazy(() => import('../AddPost/AppPostPage'))
const ProfilePage = lazy(() => import('../ProfilePage/ProfilePage'))

class App extends React.Component {
    state = {
        posts: [],
        userId: ''
    };

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/posts`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    posts: json.reverse()
                })
            })
            .catch(error => {
                this.setState({
                    error: error
                })
            })
        IdleService.setIdleCallback(this.logoutFromIdle)

        if (TokenService.hasAuthToken()) {
            IdleService.regiserIdleTimerResets()

            TokenService.queueCallbackBeforeExpiry(() => {
                AuthApiService.postRefreshToken()
            })
        }
    }

    componentWillUnmount() {
        IdleService.unRegisterIdleResets()
        TokenService.clearCallbackBeforeExpiry()
    }

    logoutFromIdle = () => {
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
        this.forceUpdate()
    }

    handleAddPost = post => {
        this.setState({
            posts: [post, ...this.state.posts]
        })
    }

    handleDeletePost = postId => {
        const newPosts = this.state.posts.filter(post => {
            return post.post_id !== postId
        })
        this.setState({
            posts: newPosts
        })
    }

    handleLoginSuccess = (userId) => {
        this.setState({
            userId: userId
        })
    }

    handleLogOut = () => {
        TokenService.clearAuthToken()
        this.setState({
            userId: ''
        })
    }


    render() {
        const value = {
            posts: this.state.posts,
            userId: this.state.userId,
            handleLoginSuccess: this.handleLoginSuccess,
            addPost: this.handleAddPost,
            deletePost: this.handleDeletePost
        }
        const logOut = TokenService.hasAuthToken() ? <button className="log-out" aria-label="log out" onClick={this.handleLogOut}>log-out</button> : ''
        const profilePath = TokenService.hasAuthToken() ? `/${window.localStorage.getItem('user_id')}` : '/login'
        const upload = TokenService.hasAuthToken() ? <footer className='App_footer'><Link to='/upload'><FontAwesomeIcon className="add-icon" icon={faPlus} size='2x' /></Link></footer> : <footer className='App_footer'></footer>
        return (
            <ApiContext.Provider value={value}>
                <div className='App'>
                    <header className='App_header'>
                        <h1 className="App-title">
                            <Link className="list-link" to='/posts'>RideSpot</Link>
                            {' '}
                            <FontAwesomeIcon className="profile-icon" icon={faSnowboarding} size='xs' />
                        </h1>


                        <div className="dropdown">
                            <button className="dropbtn" aria-label="profile dropdown"><FontAwesomeIcon className='profile-icon' icon={faUserCircle} size='3x' /></button>
                            <div className="dropdown-content">
                                <Link to={profilePath}>
                                    profile
                                </Link>
                                {logOut}
                            </div>
                        </div>
                    </header>
                    <div className="main_content">
                        <main className='App_main'>
                            <Suspense fallback={<div></div>}>
                                <Switch>
                                    <Route
                                        exact
                                        path={'/'}
                                        component={MainPaige}
                                    />
                                    <PublicOnlyRoute
                                        path={'/login'}
                                        component={LoginPage}
                                    />
                                    <Route
                                        path={'/posts'}
                                        component={PostList}
                                    />
                                    <PrivateRoute
                                        path={'/upload'}
                                        component={AddPostPage}
                                    />
                                    <PrivateRoute
                                        path={'/:userId'}
                                        component={ProfilePage}
                                    />
                                </Switch>
                            </Suspense>
                        </main>
                    </div>
                    {upload}
                </div>
            </ApiContext.Provider>
        )
    }
}

export default App
