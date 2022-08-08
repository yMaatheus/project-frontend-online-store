import React from 'react';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const cartItens = localStorage.getItem('cart');
    this.setState({ products: JSON.parse(cartItens) });
  }

  handleQuantity = ({ target: { id } }, operator) => {
    const { products } = this.state;
    const { quantity, availableQuantity } = products[id];
    if (operator === '-') {
      if (quantity > 2) {
        products[id].quantity -= 1;
      } else {
        products[id].quantity = 1;
      }
    } else {
      if (availableQuantity && quantity >= +availableQuantity) return;
      products[id].quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(products));
    this.forceUpdate();
  }

  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <div>
        {products
          ? (
            products.map((
              { name, quantity, unitPrice },
              index,
            ) => (
              <div key={ Math.random() }>
                <h3 data-testid="shopping-cart-product-name">{name}</h3>
                <span>Quantidade:</span>
                <button
                  id={ index }
                  data-testid="product-decrease-quantity"
                  type="button"
                  onClick={ (event) => this.handleQuantity(event, '-') }
                >
                  -

                </button>
                <span data-testid="shopping-cart-product-quantity">{quantity}</span>
                <button
                  id={ index }
                  data-testid="product-increase-quantity"
                  type="button"
                  onClick={ (event) => this.handleQuantity(event, '+') }
                >
                  +

                </button>
                <br />
                <span>{`Price: ${(unitPrice * quantity).toFixed(2)}`}</span>
              </div>
            ))
          )
          : (
            <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
          )}
        {products
          && (
            <Link to="/checkout" data-testid="checkout-products">
              <button type="button">Finalizar compra</button>
            </Link>
          )}
      </div>
    );
  }
}

export default Cart;
