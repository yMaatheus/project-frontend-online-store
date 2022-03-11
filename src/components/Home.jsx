import React from 'react';
import * as api from '../services/api';

// function App() {
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      products: [],
      cards: '',
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

  async onClick() {
    const { inputValue } = this.state;
    const test = '$CATEGORY_ID'; // const test exite para testes por não haver categorias ainda.
    const { results } = await api.getProductsFromCategoryAndQuery(test, inputValue);
    this.setState({ products: results });
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
    const { inputValue, cards } = this.state;
    return (
      <div>
        <header className="App-header">
          <input
            type="text"
            data-testid="query-input"
            value={ inputValue }
            onChange={ this.onInputChange }
          />
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
