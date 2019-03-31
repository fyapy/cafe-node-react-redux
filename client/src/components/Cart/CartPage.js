import React, { Component } from "react";
import { connect } from "react-redux";
import Validator from "validator";
import { withFormik } from "formik";
import Yup from "yup";
import isEmpty from "../../validation/isEmpty";
import {
  deleteFromCart,
  increaseCart,
  decreaseCart
} from "../../actions/cartAction";
import { addOrder } from "../../actions/ordersAction";

export class CartPage extends Component {
  state = {
    date: "",
    time: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    let errors = {};

    const { date, time } = this.state;

    if (Validator.isEmpty(date)) {
      errors.date = "Дата пустая";
    }

    if (Validator.isEmpty(time)) {
      errors.time = "Время пустое";
    }

    if (isEmpty(this.props.cart.cart)) {
      errors.date = "Корзина пустая";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };

  onSubmit = e => {
    e.preventDefault();

    const { errors, isValid } = this.validate();

    if (!isValid) {
      return this.setState({ errors });
    }
    this.setState({ errors: {} });
    const { cart, totalPrice } = this.props.cart;
    const { date, time } = this.state;

    this.props.addOrder({ items: cart, amount: totalPrice, date, time });
  };

  render() {
    const { cart, totalPrice } = this.props.cart;
    const { products } = this.props.home;
    const { deleteFromCart, increaseCart, decreaseCart } = this.props;
    const { errors, date, time } = this.state;

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
          <form className="col-24 row" onSubmit={this.onSubmit}>
            <div className="col-24 col-lg-12">
              <div className="modal-form-group">
                <label htmlFor="date" className="modal-form-label">
                  Дата<span className="modal-form-label-required">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={this.onChange}
                  className="modal-form-control"
                />
                <div className="modal-form-error">{errors.date}</div>
              </div>
              <div className="modal-form-group">
                <label htmlFor="time" className="modal-form-label">
                  Время<span className="modal-form-label-required">*</span>
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={time}
                  onChange={this.onChange}
                  className="modal-form-control"
                />
                <div className="modal-form-error">{errors.time}</div>
              </div>
              <div className="modal-form-group">
                <label htmlFor="phone" className="modal-form-label">
                  Телефон<span className="modal-form-label-required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={time}
                  placeholder="Ваш номер телефона"
                  onChange={this.onChange}
                  className="modal-form-control"
                />
                <div className="modal-form-error">{errors.time}</div>
              </div>
            </div>
            <div className="col-24 col-lg-12">
              <div className="modal-form-group">
                <label htmlFor="phone" className="modal-form-label">
                  Кол-во человек
                  <span className="modal-form-label-required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={time}
                  placeholder="Кол-во человек"
                  onChange={this.onChange}
                  className="modal-form-control"
                />
                <div className="modal-form-error">{errors.time}</div>
              </div>
              <div className="modal-form-group">
                <label htmlFor="comment" className="modal-form-label">
                  Комментарий к заказу
                </label>
                <textarea
                  name="comment"
                  id="comment"
                  className="modal-form-control"
                  placeholder="Личные пожелания.."
                />
                <div className="modal-form-error">{errors.time}</div>
              </div>
              <div className="cart-total">
                <span>
                  Итоговая стоимость: {totalPrice}{" "}
                  <i className="far fa-ruble-sign" />
                </span>
                <button className="cart-order-btn">Заказать</button>
              </div>
            </div>
          </form>
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
