import React from 'react'
import './style/App.css';
import Client from './client/Client'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './Register/Register'
import Cart from './Cart/Cart'
import PreviousOrders from './PreviousOrders/PreviousOrders'
import Profile from './Profile/Profile';
import Header from './Header/Header';

// in order to have the app running make sure to run this command line in your terminal:
// react start
// json-server db.json -p 3001

//special thanks to bootstrap and react semantic UI which I find really useful in imporving my styling

//other big thanks to cheapshark for their API full of games

class App extends React.Component {

  constructor() {
    super()

    this.state = {
      user: undefined,
    }
  }

  handleLogOut = () => {
    this.setState({user: undefined})
  }

  updateUserDetails = () => {
    fetch(`http://localhost:3001/profiles/${this.state.user.id}`)
      .then(resp => resp.json())
      .then(user => {
        this.setState({user})
      })
  }

  handleLogIn = newUser => {
    fetch(`http://localhost:3001/profiles`)
      .then(resp => resp.json())
      .then(profiles => {
          const user = profiles.filter(profile => profile.userName === newUser.userName)[0]
          this.setState({user})
      })
  }

  render() {
    console.log(this.state.user)
    return <Router>
        <Route path='/' render={props => <Header {...props} user={this.state.user} />} />
        <Route exact path='/' render={props => <Client {...props} user={this.state.user} addNewItem={this.updateUserDetails} />} />
        <Route
        exact path='/register'
        render={props => <Register {...props} user={this.state.user} handleLogIn={this.handleLogIn} />} />
        { this.state.user ?
        <Route exact path='/cart' render={props => <Cart {...props} user={this.state.user} updateUserDetails={this.updateUserDetails} />} />
        :
        null
        }
        { this.state.user ?
          <Route exact path='/previousOrders' render={props => <PreviousOrders {...props} user={this.state.user} />} />
          :
          null
          }
        { this.state.user ?
          <Route
          exact path='/profile'
          render={props => <Profile {...props} user={this.state.user} updateUserDetails={this.updateUserDetails}  handleLogOut={this.handleLogOut}/>} />
          :
          null
          }
      </Router>
    
  }

}

export default App;
