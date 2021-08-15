import React from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'

class EditDetailFormPassword extends React.Component {

    constructor() {
        super()

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        if(this.props.user.password !== this.state.oldPassword) {
            alert('Previous Password is incorrect')
            return
        }
        if(this.state.newPassword !== this.state.confirmNewPassword) {
            alert('New passwords do not match')
            return
        }
        if(this.state.oldPassword === this.state.newPassword) {
            this.setState({
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            })
            return
        }
        fetch(`http://localhost:3001/profiles/${this.props.user.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: this.state.newPassword})
        })
            .then(() => {
                this.setState({
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                })
                this.props.updateUserDetails()
                this.props.exitEditMode()
            })
    }

    render() {
        const { selectedToEdit, user, kind, exitEditMode, handleEditBtnClick } = this.props

        return <React.Fragment>
            {
                selectedToEdit === 'password'
                ?
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label styler={{color: 'white'}}>User Input</label>
                        <input
                            type='password'
                            name='oldPassword'
                            onChange={this.handleChange}
                            placeholder='Insert old password'
                            className='editInputs'
                            value={this.state.oldPassword}
                            required
                        />
                    </Form.Field>
                    <Form.Field>
                        <label styler={{color: 'white'}}>User Input</label>
                        <input
                            type='password'
                            name='newPassword'
                            onChange={this.handleChange}
                            placeholder='Inser new password'
                            className='editInputs'
                            value={this.state.newPassword}
                            required
                        />
                    </Form.Field>
                    <Form.Field>
                        <label styler={{color: 'white'}}>User Input</label>
                        <input
                            type='password'
                            name='confirmNewPassword'
                            onChange={this.handleChange}
                            placeholder='confirm new password'
                            className='editInputs'
                            value={this.state.confirmNewPassword}
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
                    <h3>password: {user.password.split('').map(letter => '*').join('')}</h3>
                    <button name='password' type="button" class="btn btn-warning" onClick={() => handleEditBtnClick(kind)}>
                        edit <Icon name='edit outline' />
                    </button>
                </div>
            }
        </React.Fragment>
    }
}
    
export default EditDetailFormPassword