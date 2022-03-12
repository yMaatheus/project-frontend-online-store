import React from 'react';
import CategoryList from './CategoryList';
import { Link } from 'react-router-dom';

// function App() {
class Home extends React.Component {
  render() {
    return (
      <div className="main">
        <CategoryList />
          <header className="App-header">
            <input />
            <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
            <ul>
              <span data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>
          </ul>
        </header>
      </div>
    );
  }
}

export default Home;
