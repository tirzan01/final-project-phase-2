import React from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'

class Balance extends React.Component {

    constructor() {
        super()

        this.state = {
            input: ''
        }
    }

    handleChange = e => {
        this.setState({input: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()

        const { user, updateUserDetails, exitEditMode } = this.props
        fetch(`http://localhost:3001/profiles/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({balance: `${(parseFloat(this.state.input) + parseFloat(user.balance)).toFixed(2)}`})
        })
            .then(() => {
                this.setState({input: ''})
                updateUserDetails()
                exitEditMode()
            })
    }

    render() {
        const { selectedToEdit, user, exitEditMode, handleEditBtnClick } = this.props

        return <React.Fragment>
            {selectedToEdit === 'balance'
            ?
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label styler={{color: 'white'}}>Balance</label>
                    <input
                        type='number'
                        name='userName'
                        onChange={this.handleChange}
                        placeholder='balance'
                        className='editInputs'
                        value={this.state.input}
                        required
                    />
                </Form.Field>
                <Button type="submit" basic color='yellow' className="editBtn">
                    Save changes
                </Button>
                <Button basic color='red' className="editBtn" onClick={exitEditMode}>
                    Cancel
                </Button>
            </Form>
            :
            <div className='profileElement'>
                <h3>Balance: ${user.balance}</h3>
                <button name='balance' type="button" class="btn btn-warning" onClick={() => handleEditBtnClick('balance')}>
                    edit <Icon name='edit outline' />
                </button>
            </div>}
        </React.Fragment>
    }
}
    
export default Balance
