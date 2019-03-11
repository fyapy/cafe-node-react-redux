import React, { Component } from "react";
// import PropTypes from "prop-types";

class ProductsCard extends Component {
  // static propTypes = {
  // 	prop: PropTypes
  // }

  render() {
    const { id, name, price, img } = this.props.product;
    const { addToCart } = this.props;

    return (
      <div
        className="col-24 col-sm-12 col-lg-8"
        onClick={e => addToCart(e, id)}
      >
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
