import React from 'react';
import * as api from '../services/api';

export default class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesArray: [],
    };
  }

  async componentDidMount() {
    api.getCategories()
      .then((categories) => this.setState({ categoriesArray: categories }));
  }

  render() {
    const { categoriesArray } = this.state;
    categoriesArray.pop();
    return (
      <aside className="category-list">
        <ul className="categories">
          {categoriesArray.map((category) => (

            <div key={ Math.random() }>
              <li
                data-testid="category"
                key={ category.id }
                name={ category.id }
                className="category"
              >
                {category.name}
              </li>
              <hr />

            </div>

          ))}
        </ul>
      </aside>
    );
  }
}
