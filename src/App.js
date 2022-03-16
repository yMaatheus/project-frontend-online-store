import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Details from './components/Details';
import Checkout from './components/Checkout';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/cart" component={ Cart } />
            <Route exact path="/details/:id" component={ Details } />
            <Route exact path="/checkout" component={ Checkout } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
