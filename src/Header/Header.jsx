import React from 'react'
import NavBar from './NavBar'

const Header = ({ user }) => {
    return <div id='header'>
            <img id='logo' src='./images/logo.png' alt='logo' />
            <span id='navBar'>
                <NavBar user={user} />
            </span>
        </div>
}

export default Header