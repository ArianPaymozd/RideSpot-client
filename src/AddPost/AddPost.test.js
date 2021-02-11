import React from 'react'
import ReactDOM from 'react-dom'
import AddPostPage from './AppPostPage'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <AddPostPage />,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})