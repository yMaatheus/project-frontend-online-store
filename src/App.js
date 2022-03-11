// import { render } from '@testing-library/react';
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import * as api from './services/api';
// import InitialPage from '/src/initialpage';

api.getCategories().then((categories) => { console.log(categories); });
console.log(api.getCategories());

// function App() {
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={ Home } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
