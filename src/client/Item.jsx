import React from 'react'
import { Image } from 'semantic-ui-react'

let itemsInCart = []

const Item = ({ item, user, addNewItem }) => {

    if(user) {
        itemsInCart = user.cart.filter(itemInCart => itemInCart.name === item.title)
    }

    const handleClick = () => {
        if(!user) {
            alert('Please sign in before purchase')
            return
        }
        const newItem = {
            name: item.title,
            price: item.normalPrice,
            img: item.thumb
        }
        const newCart = [...user.cart, newItem]
        fetch(`http://localhost:3001/profiles/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cart: newCart})
        })
         .then(() => {addNewItem()})
    }

    return(
    <div className='item'>
        <Image src={item.thumb} alt={item.title} className='thumbNailImg' />
        <h3 className='itemName'>{item.title} | ${item.normalPrice}</h3>
        <button type="button" className="btn btn-outline-success" onClick={handleClick}>
            Add to cart {itemsInCart.length > 0 ? `(${itemsInCart.length})` : null}
        </button>
    </div>
)}

export default Item