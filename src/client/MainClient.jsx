import React from 'react'
import SearchTerm from './SearchTerm'
import Filter from './Filter'
import ItemList from './ItemList'
import AdBox from './AdBox'

class MainClient extends React.Component {
    constructor() {
        super()

        this.state = {
            items: [],
            displayedItemsIds: [],
            sortBy: undefined,
            minPrice: '',
            maxPrice: '',
            searchTerm: '',
        }
    }

    handleSearchTermSubmit = e => {
        e.preventDefault()
        fetch(`https://www.cheapshark.com/api/1.0/deals?title=${this.state.searchTerm}`)
            .then(resp => resp.json())
            .then(allItems => {
                const items = []
                for (let i = 0; i < allItems.length; i++) {
                    if(!items.map(item => item.title).includes(allItems[i].title)) {
                        items.push(allItems[i])
                    }
                }
                this.setState({
                    items,
                    displayedItemsIds: items.map(item => item.gameID),
                    sortBy: undefined,
                    minPrice: '',
                    maxPrice: '',
                    searchTerm: '',
                })
            })
    }

    handleRangeChange = e => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handlePriceRangeSubmit = e => {
        e.preventDefault()
        const { items, minPrice, maxPrice } = this.state
        if(!minPrice && !maxPrice) {
            this.setState({
                displayedItemsIds: items.map(item => item.gameID)
            })
        } else if(minPrice && maxPrice) {
            this.setState({
                displayedItemsIds: items.filter(item => {if(item.normalPrice > minPrice && item.normalPrice < maxPrice) return item}).map(item => item.gameID)
            })
        } else if(minPrice) {
            this.setState({
                displayedItemsIds: items.filter(item => {if(item.normalPrice > minPrice) return item}).map(item => item.gameID)
            })
        } else if(maxPrice) {
            this.setState({
                displayedItemsIds: items.filter(item => {if(item.normalPrice < maxPrice) return item}).map(item => item.gameID)
            })
        }
    }

    hanldeSortByChange = value => {
        this.setState({
            sortBy: value
        }, this.sortBy)
    }

    sortBy = () => {
        if(!this.state.sortBy) {
            return this.state.items
        }else if(this.state.sortBy === 'price (low-high)') {
            this.setState(prevState => {
                return{
                    items: prevState.items.sort((a, b) => a.normalPrice - b.normalPrice)
                }
            })
        }else if(this.state.sortBy === 'price (high-low)') {
            this.setState(prevState => {
                return{
                    items: prevState.items.sort((a, b) => b.normalPrice - a.normalPrice)
                }
            })
        }else if(this.state.sortBy === 'alphabetically (a-z)') {
            this.setState(prevState => {
                return {
                    items: prevState.items.sort((a, b) => a.title.localeCompare(b.title))
                }
            })
        }else if(this.state.sortBy === 'alphabetically (z-a)'){
            this.setState(prevState => {
                return {
                    items: prevState.items.sort((a, b) => b.title.localeCompare(a.title))
                }
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                
                <div className='flexContent'>
                    <div className='leftHandSide'>
                        <Filter
                            sortBy={this.state.sortBy}
                            hanldeSortByChange={this.hanldeSortByChange}
                            maxPrice={this.state.maxPrice}
                            minPrice={this.state.minPrice}
                            handleRangeChange={this.handleRangeChange}
                            handlePriceRangeSubmit={this.handlePriceRangeSubmit}
                        />
                        <AdBox user={this.props.user} addNewItem={this.props.addNewItem} />
                    </div>
                    <div>
                        <SearchTerm
                            handleChange={this.handleChange}
                            searchTerm={this.state.searchTerm}
                            handleSearchTermSubmit={this.handleSearchTermSubmit}
                        />
                        <ItemList
                            items={this.state.items.filter(item => this.state.displayedItemsIds.includes(item.gameID))}
                            user={this.props.user}
                            addNewItem={this.props.addNewItem}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
    componentDidMount() {
        fetch("https://www.cheapshark.com/api/1.0/deals")
        .then(resp => resp.json())
        .then(allItems => {
            const items = []
            for (let i = 0; i < allItems.length; i++) {
                if(!items.map(item => item.title).includes(allItems[i].title)) {
                    items.push(allItems[i])
                }
            }
            this.setState({
                items,
                displayedItemsIds: items.map(item => item.gameID)
            })
        })
        .catch(err => {
            console.error(err);
        });
    }
}

export default MainClient
