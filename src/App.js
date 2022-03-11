// import { render } from '@testing-library/react';
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './home';
import * as api from './services/api';
// import InitialPage from '/src/initialpage';

api.getCategories().then((categories) => { console.log(categories); });
console.log(api.getCategories());

// function App() {
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
