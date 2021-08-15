import React from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'

const details = {
    firstName: {
        type: 'text',
        placeholder: 'New first name',
        title: 'First name'
    },
    lastName: {
        type: 'text',
        placeholder: 'New last name',
        title: 'Last name'
    },
    email: {
        type: 'text',
        placeholder: 'New email',
        title: 'Email'
    },
    phNumber: {
        type: 'number',
        placeholder: 'New ph. number',
        title: 'Ph. number'
    }
}

class EditDetailForm extends React.Component {

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

        if(this.props.user[this.props.kind] === this.state.input) {
            this.setState({input: ''})
            return
        }
        fetch(`http://localhost:3001/profiles/${this.props.user.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({[this.props.kind]: this.state.input})
        })
            .then(() => {
                this.setState({input: ''})
                this.props.updateUserDetails()
                this.props.exitEditMode()
            })
    }

    render() {
        const { selectedToEdit, user, kind, exitEditMode, handleEditBtnClick } = this.props

        return <React.Fragment>
            {selectedToEdit === kind
            ?
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label styler={{color: 'white'}}>{details[kind].title}</label>
                    <input
                        type={details[kind].type}
                        name='userName'
                        onChange={this.handleChange}
                        placeholder={details[kind].placeholder}
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
                <h3>{details[kind].title}: {user[kind]}</h3>
                <button name={kind} type="button" class="btn btn-warning" onClick={() => handleEditBtnClick(kind)}>
                    edit <Icon name='edit outline' />
                </button>
            </div>}
        </React.Fragment>
    }
}
    
export default EditDetailForm