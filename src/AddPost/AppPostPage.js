import React from 'react'
import AddPost from './AddPost'

export default class AddPostPage extends React.Component {
    static defaultProps = {
        history: {
            push: () => {}
        }
    }

    handlePostSuccess = () => {
        const {history} = this.props
        const destination = `/${window.localStorage.getItem('user_id')}`
        console.log(destination)
        history.push(destination)
    }

    render() {
        return <AddPost postSuccess={this.handlePostSuccess} />
    }
}