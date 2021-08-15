import React from 'react'
import { withRouter } from 'react-router-dom';

const logOut = props => {

    const handleClick = () => {
        props.handleLogOut()
        props.history.push("/register")
    }

    return <button type="button" class="btn btn-danger" onClick={handleClick}>
        Log out
    </button>
}

export default withRouter(logOut);