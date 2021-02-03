import React from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import {faSnowboarding, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'
import MainPaige from '../MainPaige/MainPage'
import LoginPage from '../LogInPage/LogInPage'
import PostList from '../PostList/PostList'
import PrivateRoute from '../Utils/PrivateRoute'
import ProfilePage from '../ProfilePage/ProfilePage'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-service'
import IdleService from '../services/idle-service'
import AddPostPage from '../AddPost/AppPostPage'

class App extends React.Component {
    state = {
        posts: [],
        userId: ''
    };
    static defaultProps = {
        location: {},
        history: {
        push: () => {},
        },
    }
    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/posts`)
        .then(res => res.json())
        .then(json => {
            this.setState({
                posts: json
            })
        })
        .catch(error => {
            console.log(error)
        })
        IdleService.setIdleCallback(this.logoutFromIdle)

        /* if a user is logged in */
        if (TokenService.hasAuthToken()) {
        /*
            tell the idle service to register event listeners
            the event listeners are fired when a user does something, e.g. move their mouse
            if the user doesn't trigger one of these event listeners,
            the idleCallback (logout) will be invoked
        */
        IdleService.regiserIdleTimerResets()

        /*
            Tell the token service to read the JWT, looking at the exp value
            and queue a timeout just before the token expires
        */
        TokenService.queueCallbackBeforeExpiry(() => {
            /* the timoue will call this callback just before the token expires */
            AuthApiService.postRefreshToken()
        })
        }
    }

    componentWillUnmount() {
        /*
          when the app unmounts,
          stop the event listeners that auto logout (clear the token from storage)
        */
        IdleService.unRegisterIdleResets()
        /*
          and remove the refresh endpoint request
        */
        TokenService.clearCallbackBeforeExpiry()
      }
    
    logoutFromIdle = () => {
        /* remove the token from localStorage */
        TokenService.clearAuthToken()
        /* remove any queued calls to the refresh endpoint */
        TokenService.clearCallbackBeforeExpiry()
        /* remove the timeouts that auto logout when idle */
        IdleService.unRegisterIdleResets()
        /*
            react won't know the token has been removed from local storage,
            so we need to tell React to rerender
        */
        this.forceUpdate()
    }

    handleAddPost = post => {
        this.setState({
            posts: [...this.state.posts, post]
        })
    }

    handleAddUser = user => {
        this.setState({
            users: [
                ...this.state.user,
                user
            ]
        })
    }

    // handleUpdateNote = updatedNote => {
    //     const newNotes = this.context.notes.map(note =>
    //       (note.note_id === updatedNote.note_id)
    //         ? updatedNote
    //         : note
    //     )
    //     this.setState({
    //       notes: newNotes
    //     })
    // }

    // handleDeleteNote = noteId => {
    //     const newNotes = this.state.notes.filter(note => note.note_id !== noteId)
    //     this.setState({
    //         notes: newNotes
    //     })
    // }

    // handleDeleteFolder = folderId => {
    //     const newFolders = this.state.folders.filter(folder => folder.folder_id !== folderId)
    //     this.setState({
    //         folders: newFolders
    //     })
    // }

    // handleEditNote = editedNote => {
    //     const editedNotes = this.state.notes.map(note => {
    //         return (note.note_id === editedNote.note_id) ? editedNote : note
    //     })
        
    //     this.setState({
    //         notes: editedNotes
    //     })
    // }

    // handleEditFolder = editedFolder => {
    //     const editedFolders = this.state.folders.map(folder => {
    //         return folder.folder_id === editedFolder.folder_id ? editedFolder : folder
    //     })
    //     this.setState({
    //         folders: editedFolders
    //     })
    // }

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
            posts: this.state.posts.reverse(),
            userId: this.state.userId,
            handleLoginSuccess: this.handleLoginSuccess,
            addPost: this.handleAddPost,
        }
        const logOut = TokenService.hasAuthToken() ? <button className="log-out" onClick={this.handleLogOut}>log-out</button> : ''
        const profilePath = TokenService.hasAuthToken() ? `/${window.localStorage.getItem('user_id')}` : '/login'
        const upload = TokenService.hasAuthToken() ? <footer className='App_footer'><Link to='/post'>upload</Link></footer> : ''
        
        return (
            <ApiContext.Provider value={value}>
                <div className='App'>
                    <header className='App_header'>
                        <h1>
                            <Link className="list-link" to='/'>RideSpot</Link>
                            {' '}
                            <FontAwesomeIcon className="profile-icon" icon={faSnowboarding} size='xs'/>
                        </h1>
                        

                        <div className="dropdown">
                            <button className="dropbtn"><FontAwesomeIcon className='profile-icon' icon={faUserCircle} size='3x' /></button>
                            <div className="dropdown-content">
                                <Link to={profilePath}>
                                    profile
                                </Link>
                                <hr />
                                {logOut}
                            </div>
                        </div>
                    </header>
                    <main className='App_main'>
                        <Switch>
                            <Route
                            exact
                            path={'/'}
                            component={PostList}
                            />
                            <PublicOnlyRoute
                            path={'/login'}
                            component={LoginPage}
                            />
                            <PublicOnlyRoute
                            path={'/register'}
                            component={MainPaige}
                            />
                            <PrivateRoute
                            path={'/post'}
                            component={AddPostPage}
                            />
                            <PrivateRoute
                            path={'/:userId'}
                            component={ProfilePage}
                            />
                            
                        </Switch>
                    </main>
                    {upload}
                </div>
            </ApiContext.Provider>
        )
    }
}

export default App
