import React, { Component } from 'react';
import './App.css';
import Login from './Login.js'
import ThermoList from './ThermoList.js'
import Cookies from "js-cookie"
import ComcastConst from './ComcastConst.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {accessToken:null, account:null}
  }

  handleLogin=(access, acct)=>{
    Cookies.set(ComcastConst.accessCookie, access);
    this.setState({accessToken: access, account:acct})
  }

  render() {
    if (this.state.accessToken==null){
      return (<Login onSubmit={this.handleLogin}/>)
    }
    else {
      return(<ThermoList account={this.state.account}/>)
    }
  }
}

export default App;
