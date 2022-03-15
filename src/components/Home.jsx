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
    let category = value;
    if (category === '') {
      category = '$CATEGORY_ID';
    }
    const { inputValue } = this.state;
    const { results } = await api.getProductsFromCategoryAndQuery(category, inputValue);
    this.setState({ products: results, categorySelected: category });
    this.displayProducts();
  }

  displayProducts() {
    const { products } = this.state;
    if (products.length > 0) {
      this.setState({ cards:
      products.map((product) => (
        <div
          className="product-card"
          key={ product.id }
          data-testid="product"
        >
          <Link
            to={ `/details/${product.id}` }
            data-testid="product-detail-link"
          >
            <img src={ product.thumbnail } alt={ product.title } />
            <p><strong>{ product.title }</strong></p>
            <i>{ product.price }</i>
          </Link>
          <button
            type="button"
            onClick={ () => api.addToCart(product.title) }
            data-testid="product-add-to-cart"
          >
            Adicionar ao Carrinho

          </button>
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
      <>
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
          <Link to="/cart" data-testid="shopping-cart-button">
            <span
              role="img"
              aria-label="cart"
            >
              🛒
            </span>
          </Link>
        </header>
        <div className="main">
          <CategoryList
            onClick={ this.onClick }
            categorySelected={ categorySelected }
          />
          {
            cards
              ? (
                <div className="product-cards-container">
                  {cards}
                </div>
              )
              : (

                <span
                  data-testid="home-initial-message"
                  className="home-initial-message"
                >
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </span>

              )
          }

        </div>
      </>
    );
  }
}

export default Home;
