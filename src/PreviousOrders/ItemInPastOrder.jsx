import React from 'react'
import { Divider, Icon } from 'semantic-ui-react'

const ItemInPastOrder = ({ item }) => {
    return (
    <React.Fragment>
            <img src={item.img} alt={item.name} className='imgInPastOrder' />
            <h3>{item.name} | {item.price}</h3>
        <Divider section />
    </React.Fragment>
)}

export default ItemInPastOrder