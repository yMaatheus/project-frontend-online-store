import React from 'react';
// import logo from './logo.svg';
import './App.css';
import * as api from './services/api';

api.getCategories().then((categories) => { console.log(categories); });
console.log(api.getCategories());

function App() {
  return (
    <div className="App">
      <header className="App-header" />
    </div>
  );
}

export default App;
