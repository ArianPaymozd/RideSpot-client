import React, { Suspense, lazy } from 'react'

const AddPost = lazy(() => import('./AddPost'))

export default class AddPostPage extends React.Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    handlePostSuccess = () => {
        const { history } = this.props
        const destination = `/${window.localStorage.getItem('user_id')}`
        history.push(destination)
    }

    render() {
        return <Suspense fallback={<div></div>} > <AddPost postSuccess={this.handlePostSuccess} /></Suspense>
    }
}