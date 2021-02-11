import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import PostList from './PostList'


it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter >
            <PostList />
        </BrowserRouter>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})