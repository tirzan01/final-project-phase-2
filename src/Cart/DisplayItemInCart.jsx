import React from 'react'
import { Image } from 'semantic-ui-react'

const DisplayItemInCart = ({ item, handleClick }) => {
    return <div className='item'>
        <Image src={item.img} alt={item.name} className='thumbNailImg' />
        <h3 className='itemName'>{item.name} | ${item.price}</h3>
        <button type="button" className="btn btn-outline-success" onClick={() => handleClick(item)}>
            Add to cart
        </button>
    </div>
}

export default DisplayItemInCart