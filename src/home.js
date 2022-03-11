import React from 'react';

// function App() {
class Home extends React.Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <input />
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
