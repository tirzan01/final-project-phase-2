import React from 'react'
import { Form } from 'semantic-ui-react'

class LogInForm extends React.Component {
    
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
        fetch('http://localhost:3001/profiles')
            .then(resp => resp.json())
            .then(profiles => {
                const profile = profiles.filter(profile => profile.userName === this.state.userName)[0]
                if(!profile) {
                    alert('User name is not valid')
                    return
                }
                if(profile.password !== this.state.password) {
                    alert('Password is not valid')
                    return
                }
                this.props.handleLogIn(profile)
                this.props.handleSubmit()
            })
    }

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Field>
                <label>User name</label>
                <input
                    type='text'
                    name='userName'
                    value={this.state.userName}
                    onChange={this.handleChange}
                    placeholder='User name'
                    className='registerInputs'
                    required
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder='Password'
                    className='registerInputs'
                    required
                />
            </Form.Field>
            <button type="submit" className='registerInputs btn btn-dark'>Log In</button>
        </Form>
    }
}

export default LogInForm