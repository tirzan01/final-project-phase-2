import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react'

class Filter extends React.Component {
    
    constructor() {
        super()

        this.state = {
            value: undefined
        }
    }

    handleChange = (e, { value }) => {
        this.props.hanldeSortByChange(value)
        this.setState({
            value,
        })
    }

    componentDidUpdate() {
        if(this.props.sortBy !== this.state.value) {
            this.setState({
                value: this.props.sortBy
            })
        }
    }

    render() {
        return <div className='filter'>
            <h1>Filter</h1>
            <h3>Sort:</h3>
            <Form>
                <Form.Field>
                <Checkbox
                    radio
                    label='price'
                    name='checkboxRadioGroup'
                    value='price'
                    checked={this.state.value === 'price'}
                    onChange={this.handleChange}
                />
                </Form.Field>
                <Form.Field>
                <Checkbox
                    radio
                    label='alphabetically'
                    name='checkboxRadioGroup'
                    value='alphabetically'
                    checked={this.state.value === 'alphabetically'}
                    onChange={this.handleChange}
                />
                </Form.Field>
            </Form>
            <h3>Price range:</h3>
            <form id='sortByPrice'>
                <label className='priceLabel'>min. price:</label>
                <input type='number' className='sortByPrice' name='minPrice' value={this.props.minPrice} onChange={this.props.handleRangeChange} />
                <br />
                <label className='priceLabel'>max. price:</label>
                <input type='number' className='sortByPrice' name='maxPrice' value={this.props.maxPrice} onChange={this.props.handleRangeChange} />
                <br />
                <button type="submit" form='sortByPrice' className="btn btn-primary" style={{width: '100%'}} onClick={this.props.handlePriceRangeSubmit}>
                    apply price range changes
                </button>
            </form>
        </div>
    }
}

export default Filter