import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesArray: [],
    };
  }

  async componentDidMount() {
    api.getCategories()
      .then((categories) => {
        categories.pop();
        this.setState({ categoriesArray: categories });
      });
  }

  render() {
    const { categoriesArray } = this.state;
    const { onClick, categorySelected } = this.props;
    return (
      <aside className="category-list">
        <ul className="categories">
          {categoriesArray.map((category) => (

            <div key={ Math.random() } className="category">
              <label htmlFor={ category.id }>
                <input
                  type="radio"
                  data-testid="category"
                  id={ category.id }
                  onClick={ onClick }
                  value={ category.id }
                  checked={ categorySelected === category.id }
                  onChange={ ({ target }) => { target.checked = true; } }
                />
                { category.name }
              </label>
            </div>
          ))}
        </ul>
      </aside>
    );
  }
}
CategoryList.propTypes = {
  onClick: PropTypes.func,
}.isRequired;

export default CategoryList;
