import React from 'react'
import MainClient from './MainClient'


const Client = ({ user, addNewItem }) => (
    <div className='mainContent'>
        <MainClient user={user} addNewItem={addNewItem} />
    </div>
    
)

export default Client