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

    switchAd = () => {
        this.adInterval = setInterval(() => {
            this.setState({
                currentDeal: this.state.deals[Math.floor(Math.random() * 60)]
            })
        }, 1000);
    }
    
    render() {
        let { currentDeal } = this.state
        return currentDeal ?
        <div className='adBox'>
            <Image src={currentDeal.thumb} alt={currentDeal.title} className='thumbNailImg' />
            <h3 className='adItemName'>{currentDeal.title} | ${currentDeal.normalPrice}</h3>
            <button type="button" className="btn btn-outline-success" style={{width: '100%'}}>Add to cart</button>
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