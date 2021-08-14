import React from 'react'
import LogIn from './LogIn'
import SignUp from './SignUp'

class Register extends React.Component {

    constructor() {
        super()

        this.state = {
            logInOrSignUp: 'logIn',
        }
    }

    render() {
        return <div className='register'>
            <LogIn />
            <SignUp />
        </div>
    }
}

export default Register