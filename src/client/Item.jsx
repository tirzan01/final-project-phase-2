import React from 'react'
import { Image } from 'semantic-ui-react'

const Item = ({ item }) => (
    <div className='item'>
        <Image src={item.thumb} alt={item.title} className='thumbNailImg' />
        <h3 className='itemName'>{item.title} | ${item.normalPrice}</h3>
        <button type="button" className="btn btn-outline-success" style={{width: '100%'}}>Add to cart</button>

    </div>
)

export default Item