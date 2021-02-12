import React from 'react'

export default React.createContext({
    userId: null,
    posts: [],
    handleLoginSuccess: (userId) => { },
    addPost: (post) => { },
    deletePost: (postId) => { },
    error: false,
    setError: () => { }
})
