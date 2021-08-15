import React from 'react'
import Item from './Item'

const ItemList = ({ items, user, addNewItem }) => (
    <div className='itemList'>
        {items.map((item, i) => <Item key={i} item={item} user={user} addNewItem={addNewItem} />)}
    </div>)

export default ItemList