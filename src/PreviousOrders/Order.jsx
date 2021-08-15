import React from 'react'
import { Divider, Icon } from 'semantic-ui-react'

const Order = ({ order, handlelick }) => {
    return <React.Fragment>
        <h2>
            <span className='numberOfItem'>items: {order.order.length}</span>
            <span className='totalPrice'>Total: ${order.order.reduce((acc, curr) => acc + parseFloat(curr.price), 0).toFixed(2)}</span>
        </h2>
        <h3>
            {order.displayDate}
            <button type="button" className="btn btn-info orderInfoBtn" onClick={() => {handlelick(order)}}>
                Info <Icon name='info circle' />
            </button>
        </h3>
        <Divider section />
    </React.Fragment>
}

export default Order