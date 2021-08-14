import React from 'react'

class LogIn extends React.Component {
    
    constructor() {
        super()

        this.state = {
            userName: '',
            password:'',
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <input type='text' name='userName' value={this.state.userName}  onChange={this.handleChange} />
            <input type='password' name='password' value={this.state.password}  onChange={this.handleChange} />
        </form>
    }
}

export default LogIn