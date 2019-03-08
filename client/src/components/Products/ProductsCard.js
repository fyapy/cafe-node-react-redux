import React, { Component } from "react";
import PropTypes from "prop-types";
import prodImg from "../../img/salad-product.jpg";

class ProductsCard extends Component {
  // static propTypes = {
  // 	prop: PropTypes
  // }

  render() {
    const { name, price, img } = this.props.product;

    return (
      <div className="col-24 col-sm-12 col-lg-8">
        <a href="/" className="products-item">
          <img src={`/img/${img}`} alt="" />
          <div className="products-item-info">
            <div className="products-item-title">{name}</div>
            <div className="products-item-price">
              {price} <i className="far fa-ruble-sign" />
            </div>
            <button className="products-item-btn">Заказать</button>
          </div>
        </a>
      </div>
    );
  }
}

export default ProductsCard;
