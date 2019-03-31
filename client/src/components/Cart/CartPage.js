import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteFromCart,
  increaseCart,
  decreaseCart
} from "../../actions/cartAction";
import { addOrder } from "../../actions/ordersAction";

// Components
import CartForm from "./CartForm";

export class CartPage extends Component {
  onSubmit = values => {
    const { cart, totalPrice } = this.props.cart;

    this.props.addOrder({ items: cart, amount: totalPrice, ...values });
  };

  render() {
    const { cart } = this.props.cart;
    const { products } = this.props.home;
    const { deleteFromCart, increaseCart, decreaseCart } = this.props;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-24">
            <div className="categories-title">Корзина</div>
          </div>
          <div className="col-24">
            {cart.length <= 0 ? (
              <div className="panel-table-empty">Ваша корзина пуста</div>
            ) : (
              <table className="panel-table">
                <thead className="panel-table-head">
                  <tr>
                    <th className="panel-table-head-item">Номер</th>
                    <th className="panel-table-head-item">Изображение</th>
                    <th className="panel-table-head-item">Название</th>
                    <th className="panel-table-head-item">Количетсво</th>
                    <th className="panel-table-head-item">Действия</th>
                  </tr>
                </thead>
                <tbody className="panel-tabel-body">
                  {cart.map((cart, id) => {
                    const cartItem = products.find(p => p.id === cart.id);
                    return (
                      <tr key={id} className="panel-table-body-row">
                        <th
                          className="panel-table-body-item"
                          data-label="Номер"
                        >
                          {id + 1}
                        </th>
                        <th
                          className="panel-table-body-item image"
                          data-label="Изображение"
                        >
                          <img
                            src={`/img/${cartItem.img}`}
                            alt={cartItem.name}
                          />
                        </th>
                        <th
                          className="panel-table-body-item"
                          data-label="Название"
                        >
                          {cartItem.name}
                        </th>
                        <th
                          className="panel-table-body-item"
                          data-label="Количество"
                        >
                          {cart.quantity}
                        </th>
                        <th
                          className="panel-table-body-item"
                          data-label="Действия"
                        >
                          <span
                            className="panel-table-body-item-increase"
                            onClick={e => increaseCart(cartItem.id)}
                          >
                            <i className="far fa-plus" /> 1 Шт
                          </span>
                          <span
                            className="panel-table-body-item-decrease"
                            onClick={e => decreaseCart(cartItem.id)}
                          >
                            <i className="far fa-minus" /> 1 Шт
                          </span>
                          <span
                            className="panel-table-body-item-delete"
                            onClick={e => deleteFromCart(cartItem.id)}
                          >
                            <i className="far fa-trash-alt" /> Удалить
                          </span>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <CartForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  home: state.home
});

export default connect(
  mapStateToProps,
  { deleteFromCart, increaseCart, decreaseCart, addOrder }
)(CartPage);
