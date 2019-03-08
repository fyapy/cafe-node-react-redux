import React, { Component } from "react";
import PropTypes from "prop-types";

class CategoryCard extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired
  };

  render() {
    const { category, scroll } = this.props;

    return (
      <div className="col-12 col-sm-8 col-lg-3">
        <a
          href={`/${category.id}`}
          className="categories-item"
          onClick={e => scroll(e, category.id)}
        >
          <img src={`/img/${category.img}`} alt="Category" />
          <div className="categories-item-title">{category.name}</div>
        </a>
      </div>
    );
  }
}

export default CategoryCard;
