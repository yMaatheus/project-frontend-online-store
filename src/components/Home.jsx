import React from 'react';
import { Link } from 'react-router-dom';
import CategoryList from './CategoryList';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      products: [],
      cards: '',
      categorySelected: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.displayProducts = this.displayProducts.bind(this);
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({
      inputValue: value,
    });
  }

  async onClick(event) {
    event.preventDefault();
    const { target: { value } } = event;
    console.log(value);
    let category = value;
    if (category === '') {
      category = '$CATEGORY_ID';
    }
    const { inputValue } = this.state;
    // const test = '$CATEGORY_ID'; // const test exite para testes por não haver categorias ainda.
    const { results } = await api.getProductsFromCategoryAndQuery(category, inputValue);
    this.setState({ products: results, categorySelected: category });
    this.displayProducts();
  }

  displayProducts() {
    const { products } = this.state;
    if (products.length > 0) {
      this.setState({ cards:
      products.map((product) => (
        <div key={ product.id } data-testid="product">
          <h3>{ product.title }</h3>
          <img src={ product.thumbnail } alt={ product.title } />
          <p>{ product.price }</p>
        </div>
      )),
      });
    } else {
      this.setState({ cards: (
        <p>Nenhum produto foi encontrado</p>
      ) });
    }
  }

  render() {
    const { inputValue, cards, categorySelected } = this.state;
    return (
      <div className="main">
        <CategoryList
          onClick={ this.onClick }
          categorySelected={ categorySelected }
        />
        <header className="App-header">
          <input
            type="text"
            data-testid="query-input"
            value={ inputValue }
            onChange={ this.onInputChange }
          />
          <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.onClick }
          >
            Pesquisar
          </button>
          <ul>
            <span data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>
          </ul>
          <div>
            {cards}
          </div>
        </header>
      </div>
    );
  }
}

export default Home;
