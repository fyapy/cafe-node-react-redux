import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Cart extends Component {
  render() {
    const { cart, totalPrice } = this.props.cart;

    return (
      <Link to="/cart" className={`cart ${cart.length > 0 && "active"}`}>
        <div className="cart-title">
          <i className="far fa-shopping-cart" /> Корзина{" "}
          <small>({cart.length} Шт.)</small>
          <span className="cart-price">
            {totalPrice} <i className="far fa-ruble-sign" />
          </span>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  home: state.home
});

export default connect(mapStateToProps)(Cart);
