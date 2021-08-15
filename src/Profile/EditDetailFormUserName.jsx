import React from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'

class EditDetailFormUserName extends React.Component {

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
        if(this.props.user.userName === this.state.input) {
            this.setState({input: ''})
            return
        }
        fetch('http://localhost:3001/profiles')
            .then(resp => resp.json())
            .then(profiles => {
                const sameUserName = profiles.filter(profile => profile.userName === this.state.input)
                if(sameUserName.length !== 0) {
                    alert('User name is being already used')
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
            })    
    }

    render() {
        const { selectedToEdit, user, kind, exitEditMode, handleEditBtnClick } = this.props

        return <React.Fragment>
        {selectedToEdit === 'userName'
        ?
        <Form onSubmit={this.handleSubmit}>
            <Form.Field>
                <label styler={{color: 'white'}}>User name</label>
                <input
                    type='text'
                    name='userName'
                    onChange={this.handleChange}
                    placeholder='new user name'
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
            <h3>User name: {user.userName}</h3>
            <button name='userName' type="button" class="btn btn-warning" onClick={() => handleEditBtnClick(kind)}>
                edit <Icon name='edit outline' />
            </button>
        </div>}
    </React.Fragment>
    }
}
    
export default EditDetailFormUserName