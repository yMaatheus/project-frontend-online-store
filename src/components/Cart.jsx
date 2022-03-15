import React from 'react';

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

  render() {
    const { products } = this.state;
    return (
      products
        ? (
          products.map(({ name, quantity }) => (
            <div key={ Math.random() }>
              <h3 data-testid="shopping-cart-product-name">{name}</h3>
              <h4 data-testid="shopping-cart-product-quantity">{quantity}</h4>
            </div>
          ))
        )
        : (
          <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
        )
    );
  }
}

export default Cart;
