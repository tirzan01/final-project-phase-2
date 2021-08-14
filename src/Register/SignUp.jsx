import React from 'react'
class SignUp extends React.Component {

    constructor() {
        super()

        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            phNumber:'',
            password: '',
            confirmPassword: '',
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
            <input type='text' name='userName' onChange={this.handleChange} value={this.state.userName} />
            <input type='text' name='firstName' onChange={this.handleChange} value={this.state.firstName} />
            <input type='text' name='lastName' onChange={this.handleChange} value={this.state.lastName} />
            <input type='text' name='email' onChange={this.handleChange} value={this.state.email} />
            <input type='number' name='phNumber' onChange={this.handleChange} value={this.state.phNumber} />
            <input type='password' name='password' onChange={this.handleChange} value={this.state.password} />
            <input type='password' name='confirmPassword' onChange={this.handleChange} value={this.state.confirmPassword} />
        </form>
    }
}

export default SignUp