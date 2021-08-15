import React from 'react'
import { Segment } from 'semantic-ui-react'
import Item from '../client/Item'
import ItemInPastOrder from './ItemInPastOrder'

const selectedOrder = ({ selectedOrder }) => {
    return <div>
        <h1>{selectedOrder.displayDate}</h1>
        <Segment>
            {selectedOrder.order.map(item => <ItemInPastOrder item={item} />)}
            <h2>
                Total: ${selectedOrder.order.reduce((acc, curr) => acc + parseFloat(curr.price), 0)}
            </h2>
        </Segment>
    </div>
}

export default selectedOrder