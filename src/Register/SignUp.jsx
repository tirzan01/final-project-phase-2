import React from 'react'
import { withRouter } from 'react-router-dom';
import SignUpForm from './SignUpForm';

const SignUp = props => {

    const handleSubmit = () => props.history.push("/")

    return <SignUpForm handleSubmit={handleSubmit} handleLogIn={props.handleLogIn} />
}

export default withRouter(SignUp);