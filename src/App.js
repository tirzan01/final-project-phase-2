import React from 'react'
import './style/App.css';
import Client from './client/Client'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './Register/Register'
import Cart from './Cart/Cart'
import PreviousOrders from './PreviousOrders/PreviousOrders'
import Profile from './Profile/Profile';
import Header from './Header/Header';

class App extends React.Component {

  constructor() {
    super()

    this.state = {
      user: true,
    }
  }

  handleLogIn = user => {
    this.setState({user})
  }

  render() {
    return <Router>
        <Route path='/' render={props => <Header {...props} user={this.state.user} />} />
        <Route exact path='/' render={props => <Client {...props} user={this.state.user} />} />
        <Route exact path='/register' render={props => <Register {...props} user={this.state.user} />} />
        <Route exact path='/cart' render={props => <Cart {...props} user={this.state.user} />} />
        <Route exact path='/previousOrders' render={props => <PreviousOrders {...props} user={this.state.user} />} />
        <Route exact path='/profile' render={props => <Profile {...props} user={this.state.user} />} />
      </Router>
    
  }


}

export default App;
