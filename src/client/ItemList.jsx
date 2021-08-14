import React from 'react'
import Item from './Item'
// import { Button, Card, Image } from 'semantic-ui-react'

const ItemList = ({ items }) => <div className='itemList'>{items.map((item, i) => <Item key={i} item={item} />)}</div>

export default ItemList