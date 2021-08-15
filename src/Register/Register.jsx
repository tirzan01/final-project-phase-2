import React from 'react'
import Description from './Description'
import LogIn from './LogIn'
import SignUp from './SignUp'

const signUpMsg = "Don't have an account? Sign Up"

const logInMsg = "Already have and account? Log in"

class Register extends React.Component {

    constructor() {
        super()

        this.state = {
            logInOrSignUp: true,
        }
    }

    render() {
        return <div className='mainContent flexContent'>
            <div id='description'>
                <Description />
            </div>
            <div id='registerFormBox'>
                {
                    this.state.logInOrSignUp
                    ?
                    <LogIn handleLogIn={this.props.handleLogIn} />
                    :
                    <SignUp handleLogIn={this.props.handleLogIn} />
                }
                <button
                type="button"
                class="btn btn-info registerInputs"
                onClick={() => {
                    this.setState(prevState => {
                        return {logInOrSignUp: !prevState.logInOrSignUp}
                    })
                }}>
                    {this.state.logInOrSignUp ? signUpMsg : logInMsg}
                </button>
            </div>
        </div>
    }
}

export default Register