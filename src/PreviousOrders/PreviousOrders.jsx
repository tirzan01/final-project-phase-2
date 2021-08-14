import React from 'react'
import Order from './Order'

class PreviousOrder extends React.Component {

    constructor() {
        super()

        this.state = {
            orders: [],
        }
    }

    render() {
        return <div>
            {this.state.orders.map(order => <Order order={order} />)}
        </div>
    }
}

export default PreviousOrder