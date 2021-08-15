import React from 'react'
import { Form } from 'semantic-ui-react'

class SignUpForm extends React.Component {

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
        if(this.state.password !== this.state.confirmPassword) {
            alert("Passwords don't match")
            return
        }
        fetch('http://localhost:3001/profiles')
            .then(resp => resp.json())
            .then(profiles => {
                const sameUserName = profiles.filter(profile => profile.userName === this.state.userName)
                if(sameUserName.length !== 0) {
                    alert('User name is already being used')
                    return
                }
                const newProfile = {
                    "userName": this.state.userName,
                    "firstName": this.state.firstName,
                    "lastName": this.state.lastName,
                    "email": this.state.email,
                    "phNumber": this.state.phNumber,
                    "balance": '0.00',
                    "password": this.state.password,
                    "cart": [],
                    "pastOrders": []
                }
                fetch('http://localhost:3001/profiles', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProfile)
                })
                    .then(() => {
                        this.props.handleLogIn(newProfile)
                        this.props.handleSubmit()
                    })
            })
    }

    render() {
        return <Form className onSubmit={this.handleSubmit}>
            <Form.Field>
                <label>User Name</label>
                <input
                    type='text'
                    name='userName'
                    onChange={this.handleChange}
                    value={this.state.userName}
                    placeholder='e.g. Thomas2001'
                    className='registerInputs'
                    required
                />
            </Form.Field>
            <Form.Field>
                <label>First Name</label>
              <input
                type='text'
                name='firstName'
                onChange={this.handleChange}
                value={this.state.firstName}
                placeholder='e.g. Thomas'
                className='registerInputs'
                required
              />
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input
                    type='text'
                    name='lastName'
                    onChange={this.handleChange}
                    value={this.state.lastName}
                    placeholder='e.g. Montalto'
                    className='registerInputs'
                    required
                />
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input
                    type='text'
                    name='email'
                    onChange={this.handleChange}
                    value={this.state.email}
                    placeholder='thomasmontalto@gmail.com'
                    className='registerInputs'
                    required
                />
            </Form.Field>
            <Form.Field>
                <label>ph. Number</label>
                <input
                    type='number'
                    name='phNumber'
                    onChange={this.handleChange}
                    value={this.state.phNumber}
                    placeholder='0423456789'
                    className='registerInputs'
                    required
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    onChange={this.handleChange}
                    value={this.state.password}
                    placeholder='Password'
                    className='registerInputs'
                    required
                />
            </Form.Field>
            <Form.Field>
                <label>Confirm Password</label>
                <input
                    type='password'
                    name='confirmPassword'
                    onChange={this.handleChange}
                    value={this.state.confirmPassword}
                    placeholder='Confirm password'
                    className='registerInputs'
                    required
                />
            </Form.Field>
            <button type="submit" className='registerInputs btn btn-dark'>Sign Up</button>
        </Form>
    }
}

export default SignUpForm