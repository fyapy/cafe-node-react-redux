import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'

export class Cart extends Component {
  // static propTypes = {
  // 	prop: PropTypes
  // }

  render() {
    const { cart, totalPrice } = this.props.cart;

    return (
      <Link to="/cart" className="cart">
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
