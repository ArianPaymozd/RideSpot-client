import React from 'react' 
import './ErrorBoundary.css'

class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    }

    static getDirivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    render() {
        if(this.state.hasError) {
            return (
                <div className='error-boundary'>
                    <h1>Something went wrong, please try again later</h1>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary