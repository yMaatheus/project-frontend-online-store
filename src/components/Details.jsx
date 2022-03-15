import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      productName: '',
      productPrice: 0,
      productThumbnail: '',
      attributes: [],
      valueEmail: '',
      valueEvaluation: '',
      quantity: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await api.getProductByProductId(id);
    const DEZ = 10;
    const array = product.attributes.filter(
      (_attribute, index) => (index >= 0 && index < DEZ),
    );
    this.setState({
      productName: product.title,
      productPrice: product.price,
      productThumbnail: product.thumbnail,
      attributes: array,
    });
    if (localStorage.length > 0) {
      this.setState({
        valueEmail: localStorage.getItem('valueEmail'),
        valueEvaluation: localStorage.getItem('valueEvaluation'),
      });
    }
  }

  handleChange({ target }) {
    const { value, name } = target;
    localStorage.setItem(name, value);
    this.setState({ [name]: value });
  }

  addToCart = () => {
    const { quantity, productName } = this.state;
    if (localStorage.length > 0) {
      const previousCart = JSON.parse(localStorage.getItem('cart'));
      localStorage.setItem(
        'cart', JSON.stringify(
          [...previousCart, { name: productName, quantity }],
        ),
      );
      return;
    }
    localStorage.setItem('cart', JSON.stringify([{ name: productName, quantity }]));
  }

  handleQuantity = ({ target }) => {
    const { quantity } = this.state;
    if (target.innerText === '-') {
      this.setState({ quantity: quantity > 1 ? quantity - 1 : 0 });
      return;
    }
    this.setState({ quantity: quantity + 1 });
  }

  render() {
    const {
      productName,
      productPrice,
      productThumbnail,
      attributes,
      valueEmail,
      valueEvaluation,
      quantity,
    } = this.state;

    return (
      <section>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <h1 data-testid="product-detail-name">
          {`${productName} - R$ ${productPrice.toFixed(2)}`}
        </h1>
        <section>
          <img src={ productThumbnail } alt={ productName } />
        </section>
        <section>
          <h4>Especificações Técnicas</h4>
          <section>
            <ul>
              {attributes.map(({ name, value_name: value }) => (
                <li key={ name }>{`${name}: ${value}`}</li>
              ))}
            </ul>
          </section>
        </section>
        <section>
          <span>Quantidade: </span>
          <button type="button" onClick={ this.handleQuantity }>-</button>
          <span>{quantity}</span>
          <button type="button" onClick={ this.handleQuantity }>+</button>
          <h1>Avaliações</h1>
          <form>
            <fieldset>
              <input
                type="text"
                name="valueEmail"
                data-testid="product-detail-email"
                onChange={ this.handleChange }
                value={ valueEmail }
              />
              <span>{valueEmail}</span>
              <textarea
                data-testid="product-detail-evaluation"
                name="valueEvaluation"
                id=""
                cols="5"
                rows="5"
                placeholder="Mensagem (Opcional)"
                onChange={ this.handleChange }
                value={ valueEvaluation }
              />
              <button type="button" data-testid="submit-review-btn">Avaliar</button>
            </fieldset>
            <label htmlFor="rating">
              <input type="radio" name="star1" id="rating" data-testid="1-rating" />
              <input type="radio" name="star2" id="rating" data-testid="2-rating" />
              <input type="radio" name="star3" id="rating" data-testid="3-rating" />
              <input type="radio" name="star4" id="rating" data-testid="4-rating" />
              <input type="radio" name="star5" id="rating" data-testid="5-rating" />
            </label>
            <button
              type="button"
              onClick={ this.addToCart }
              data-testid="product-detail-add-to-cart"
            >
              Adicionar ao Carrinho

            </button>
          </form>
        </section>
      </section>
    );
  }
}

Details.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Details;
