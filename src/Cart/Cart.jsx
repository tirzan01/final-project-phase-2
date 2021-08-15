import React from 'react'
import ItemInCart from './ItemInCart'
import { Segment } from 'semantic-ui-react'
import DisplayItemInCart from './DisplayItemInCart'

const month = {Jan: 'a', Feb: 'b', Mar: 'c', Apr: 'e', Jun: 'f', Jul: 'g', Aug: 'h', Sep: 'i', Oct: 'l', Nov: 'm', Dec: 'n'}

class Cart extends React.Component {
    constructor() {
        super()

        this.state = {
            items: [],
            selectedItem: undefined,
        }
    }

    updateCart = newCart => {
        fetch(`http://localhost:3001/profiles/${this.props.user.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cart: newCart})
      
        })
            .then(() => {
                this.setState({items: newCart})
                this.props.updateUserDetails()
            })
    }

    removeItem = element => {
        const copyCart = [...this.state.items]
        const indexOfItem = copyCart.findIndex(item => item.name === element.name)
        const newCart = copyCart.slice(0, indexOfItem).concat(copyCart.slice(indexOfItem + 1))
        this.updateCart(newCart)
    }

    addItem = element => {
        const copyCart = [...this.state.items]
        copyCart.push(element)
        const newCart = copyCart.sort((a, b) => a.price - b.price)
        
        this.updateCart(newCart)
    }

    getItemInfo = item => {
        this.setState({
            selectedItem: item
        })
    }

    completeOrder = () => {
        const total = this.state.items.reduce((acc, curr) => acc + parseFloat(curr.price), 0).toFixed(2)
        if(parseFloat(this.props.user.balance) < total) {
            alert('Not enough balance')
            return
        }
        const currTime = new Date()
        let dateDetail = `${currTime}`.split(' ')
        const orderDate = `${dateDetail[3]}-${month[dateDetail[1]]}-${dateDetail[2]}-${dateDetail[4]}`
        const displayDate = `Date: ${dateDetail[2]}-${dateDetail[1]}-${dateDetail[3]} Time: ${dateDetail[4]}`
        const order = {
            orderDate,
            displayDate,
            order: this.state.items
        }
        fetch(`http://localhost:3001/profiles/${this.props.user.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                balance: `${parseFloat(this.props.user.balance) - total}`,
                cart: [],
                pastOrders: [...this.props.user.pastOrders, order]
            })
        })
            .then(() => {
                alert('Purchase was succesful!')
                this.setState({items: []})
                this.props.updateUserDetails()
            })
    }

    render() {
        return <div className='mainContent flexContent'>
            <div id='cart' >
                <h1>Check out</h1>
                <h3> Current {this.props.user.userName}'s balance: ${this.props.user.balance}</h3>
                <Segment>
                    {
                        this.state.items.length > 0
                        ?
                        <React.Fragment>
                            {this.state.items.map(item => <ItemInCart item={item} removeItem={this.removeItem} getItemInfo={this.getItemInfo} />)}
                            <h2>
                                ${this.state.items.reduce((acc, curr) => acc + parseFloat(curr.price), 0).toFixed(2)}
                                <button type="button" class="btn btn-success checkOut" onClick={this.completeOrder}>
                                    Complete order
                                </button>
                            </h2>
                        </React.Fragment>
                        :
                        <h2>No items added yet</h2>
                    }
                </Segment>
            </div>
            <div id='selectedCartItem'>
                {
                    this.state.selectedItem
                    ?
                    <DisplayItemInCart item={this.state.selectedItem} handleClick={this.addItem} />
                    :
                    <h1>Display Item's Area</h1>
                }
            </div>
        </div>
    }

    componentDidMount() {
        fetch(`http://localhost:3001/profiles/${this.props.user.id}`)
            .then(resp => resp.json())
            .then(user => {
                this.setState({
                    items: user.cart.sort((a, b) => a.price - b.price)
                })
            })
    }
}

export default Cart