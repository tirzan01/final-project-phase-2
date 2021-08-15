import React from 'react'
import { Image } from 'semantic-ui-react'

class AdBox extends React.Component {
    
    constructor() {
        super()
        
        this.state = {
            deals: [],
            currentDeal: undefined,
        }
    }

    handleClick = () => {
        if(!this.props.user) {
            alert('Please sign in before purchase')
            return
        }
        const { user, addNewItem } = this.props
        const newItem = {
            name: this.state.currentDeal.title,
            price: this.state.currentDeal.normalPrice,
            img: this.state.currentDeal.thumb
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

    switchAd = () => {
        this.adInterval = setInterval(() => {
            this.setState({
                currentDeal: this.state.deals[Math.floor(Math.random() * 60)]
            })
        }, 5000);
    }
    
    render() {
        let { currentDeal } = this.state
        let itemsInCart = this.props.user ? this.props.user.cart.filter(itemInCart => itemInCart.name === this.state.currentDeal.title) : []

        return currentDeal ?
        <div className='adBox'>
            <Image src={currentDeal.thumb} alt={currentDeal.title} className='thumbNailImg' />
            <h3 className='adItemName'>{currentDeal.title} | ${currentDeal.normalPrice}</h3>
            <button type="button" className="btn btn-success" style={{width: '100%'}} onClick={this.handleClick}>
                Add to cart 
                {itemsInCart.length > 0 ? `(${itemsInCart.length})` : null}
            </button>
        </div>
        :
        <div className='adBox'>
            <div className="spinner-border" style={{width: "5rem", height: "5rem", marginTop: '40%'}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h3>Loading...</h3>
        </div>
    }

    componentDidMount() {
        fetch('https://www.cheapshark.com/api/1.0/deals')
            .then(resp => resp.json())
            .then(deals => {
                this.setState({
                    deals,
                    currentDeal: deals[Math.floor(Math.random() * 60)]
                }, this.switchAd)
            })
    }

    componentWillUnmount() {
        clearInterval(this.adInterval)
    }
}

export default AdBox