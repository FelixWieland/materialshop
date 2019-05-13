import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; //  withRouter, Redirect 
import { theme } from './themes';
import { MuiThemeProvider } from '@material-ui/core/styles';

import './App.css';

import Homepage from './components/pages/Homepage';
import NotFound from './components/pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Shoppingcart from './components/Shoppingcart';
import Material from './components/pages/Material';
import MainData from './components/pages/MainData';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active_theme: theme["materialshop_theme"],
      paddingTop: 76,
      shoppingCartState: []
    }
  }

  setShoppingCartState = (items) => {
    this.setState({ shoppingCartState: items })
  }

  getShoppingCartState = () => {
    return this.state.shoppingCartState;
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={this.state.active_theme}>
          <Navbar />
          <Menu />
          <div className="App" style={{ padding: 10, paddingTop: this.state.paddingTop, paddingBottom: 0, width: "calc(100% - 270px)", marginLeft: 250, }}>
            <Switch>
              <Route path="/" component={() => (<Homepage />)} exact />
              <Route path="/ordermat" component={() => (<Material setShoppingCartState={this.setShoppingCartState} getShoppingCartState={this.getShoppingCartState} />)} exact />
              <Route path="/stdat" component={() => (<MainData setShoppingCartState={this.setShoppingCartState} getShoppingCartState={this.getShoppingCartState} />)} exact />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Shoppingcart items={this.state.shoppingCartState} />
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }

}

export default App;
