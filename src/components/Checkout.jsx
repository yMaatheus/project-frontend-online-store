import React from 'react';

class Checkout extends React.Component {
  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <input
              type="text"
              name="fullname"
              data-testid="checkout-fullname"
              placeholder="Nome Completo"
            />
            <input
              type="text"
              name="email"
              data-testid="checkout-email"
              placeholder="e-mail"
            />
            <input
              type="text"
              name="cpf"
              data-testid="checkout-cpf"
              placeholder="CPF"
            />
            <input
              type="text"
              name="phone"
              data-testid="checkout-phone"
              placeholder="Telefone"
            />
            <input
              type="text"
              name="cep"
              data-testid="checkout-cep"
              placeholder="CEP"
            />
            <input
              type="text"
              name="address"
              data-testid="checkout-address"
              placeholder="Endereço"
            />
            <button type="button">Finalizar</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Checkout;
