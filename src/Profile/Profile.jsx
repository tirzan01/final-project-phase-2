import React from 'react'
import { Divider, Segment } from 'semantic-ui-react'
import EditDetailFormPassword from './EditDetailFormPassword'
import EditDetailFormUserName from './EditDetailFormUserName'
import EditDetailForm from './EditDetailForm'
import LogOut from './LogOut'
import Balance from './Balance'

class Profile extends React.Component {

    constructor() {
        super()

        this.state = {
            selectedToEdit: undefined
        }
    }

    handleEditBtnClick = kind => {
        this.setState({selectedToEdit: kind})
    }

    exitEditMode = () => {
        this.setState({selectedToEdit: undefined})
    }

    render() {
        const { user, updateUserDetails, handleLogOut } = this.props

        return <div className='mainContent profile'>
            <h1>{this.props.user.userName}'s profile</h1>
            <div id='profileDetails'>
                <Segment inverted>
                    <EditDetailFormUserName
                        user={user}
                        handleEditBtnClick={this.handleEditBtnClick}
                        exitEditMode={this.exitEditMode}
                        selectedToEdit={this.state.selectedToEdit}
                        kind={'userName'}
                        updateUserDetails={updateUserDetails}
                    />
                    <Divider inverted />
                    <EditDetailForm
                        user={user}
                        handleEditBtnClick={this.handleEditBtnClick}
                        exitEditMode={this.exitEditMode}
                        selectedToEdit={this.state.selectedToEdit}
                        kind={'firstName'}
                        updateUserDetails={updateUserDetails}
                    />
                    <Divider inverted />
                    <EditDetailForm
                        user={user}
                        handleEditBtnClick={this.handleEditBtnClick}
                        exitEditMode={this.exitEditMode}
                        selectedToEdit={this.state.selectedToEdit}
                        kind={'lastName'}
                        updateUserDetails={updateUserDetails}
                    />
                    <Divider inverted />
                    <EditDetailForm
                        user={user}
                        handleEditBtnClick={this.handleEditBtnClick}
                        exitEditMode={this.exitEditMode}
                        selectedToEdit={this.state.selectedToEdit}
                        kind={'email'}
                        updateUserDetails={updateUserDetails}
                    />
                    <Divider inverted />
                    <EditDetailForm
                        user={user}
                        handleEditBtnClick={this.handleEditBtnClick}
                        exitEditMode={this.exitEditMode}
                        selectedToEdit={this.state.selectedToEdit}
                        kind={'phNumber'}
                        updateUserDetails={updateUserDetails}
                    />
                    <Divider inverted />
                    <EditDetailFormPassword
                        user={user}
                        handleEditBtnClick={this.handleEditBtnClick}
                        exitEditMode={this.exitEditMode}
                        selectedToEdit={this.state.selectedToEdit}
                        kind={'password'}
                        updateUserDetails={updateUserDetails}
                    />
                    <Divider inverted />
                    <Balance
                        user={user}
                        handleEditBtnClick={this.handleEditBtnClick}
                        exitEditMode={this.exitEditMode}
                        selectedToEdit={this.state.selectedToEdit}
                        updateUserDetails={updateUserDetails}
                    />
                    <Divider inverted />
                    <LogOut handleLogOut={handleLogOut} />
                </Segment>
                
            </div>
        </div>
    }
}

export default Profile