import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false, errorMsg: ''
    }

    componentDidCatch = (err, info) => {
        this.setState({
            hasError: true, errorMsg: err
        });
    }

    render(){
        if (this.state.errorMsg) {
            return <h1>Something went wrong</h1>
        } else {
            return this.props.children;
        }
        
    }
}

export default ErrorBoundary;