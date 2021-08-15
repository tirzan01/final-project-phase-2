import React from 'react'
import { NavLink } from 'react-router-dom';

const style = {
    marginRight: '20px',
    fontSize: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '3px',
    color: 'black'
}

const activeStyle = {
    color: 'blue'
}

const NavBar = ({ user }) => (
    <React.Fragment>
        <NavLink
            to='/'
            exact
            style={style}
            activeStyle={activeStyle}
        >
            items
        </NavLink>
        {user ?
            <NavLink
                to='/previousOrders'
                exact
                style={style}
                activeStyle={activeStyle}
            >
                Previous Orders
            </NavLink>
            :
            null
        }
        {user ?
            <NavLink
                to='/cart'
                exact
                style={style}
                activeStyle={activeStyle}
            >
                Cart
            </NavLink>
            :
            null
        }
        {user ?
            <NavLink
                to='/profile'
                exact
                style={style}
                activeStyle={activeStyle}
            >
                Profile
            </NavLink>
            :
            <NavLink
                to='/register'
                exact
                style={style}
                activeStyle={activeStyle}
            >
                Log In
            </NavLink>
        }
        
    </React.Fragment>
)

export default NavBar