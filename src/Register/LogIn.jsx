import React from 'react'
import { withRouter } from 'react-router-dom';
import LogInForm from './LogInForm';

const LogIn = props => {

    const handleSubmit = () => props.history.push("/")

    return <LogInForm handleSubmit={handleSubmit} handleLogIn={props.handleLogIn} />
}

export default withRouter(LogIn);