import React from 'react'
import Order from './Order'
import { Segment } from 'semantic-ui-react'
import SelectedOrder from './SelectedOrder'

class PreviousOrder extends React.Component {

    constructor() {
        super()

        this.state = {
            orders: [],
            selectedOrder: undefined
        }
    }

    handleGetInfoBtnClick = order => {
        this.setState({selectedOrder: order})
    }

    render() {
        return <div className='mainContent flexContent'>
            <div id='orderList'>
                <h1>Previous {this.props.user.userName}'s Orders</h1>
                <Segment>
                    {this.state.orders.map(order => <Order order={order} handlelick={this.handleGetInfoBtnClick} />)}
                </Segment>
            </div>
            <div id='displaySelectedOrder'>
                {
                    this.state.selectedOrder
                    ?
                    <SelectedOrder selectedOrder={this.state.selectedOrder} />
                    :
                    <h1>Display Order's Area</h1>
                }
            </div>
        </div>
    }

    componentDidMount() {
        fetch(`http://localhost:3001/profiles/${this.props.user.id}`)
            .then(resp => resp.json())
            .then(user => {
                this.setState({
                    orders: user.pastOrders.sort((a, b) => a.orderDate.localeCompare(b.orderDate))
                })
            })
        }
}

export default PreviousOrder