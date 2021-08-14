import React from 'react'
import Item from '../client/Item'

class Cart extends React.Component {
    constructor() {
        super()

        this.state = {
            items: []
        }
    }

    render() {
        return <div id='cart'>
            {this.state.items.map(item => <Item item={item} />)}
        </div>
    }
}

export default Cart