import React, { Component } from "react";
import { connect } from "react-redux";

export class CartPage extends Component {
  render() {
    const { cart, totalPrice } = this.props.cart;
    const { products } = this.props.home;

    return (
      <div className="container">
        <div className="row">
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
                        <th className="panel-table-body-item">{id + 1}</th>
                        <th className="panel-table-body-item image">
                          <img
                            src={`/img/${cartItem.img}`}
                            alt={cartItem.name}
                          />
                        </th>
                        <th className="panel-table-body-item">
                          {cartItem.name}
                        </th>
                        <th className="panel-table-body-item">
                          {cart.quantity}
                        </th>
                        <th className="panel-table-body-item">
                          <span className="panel-table-body-item-increase">
                            <i className="far fa-plus" /> 1 Шт
                          </span>
                          <span className="panel-table-body-item-decrease">
                            <i className="far fa-minus" /> 1 Шт
                          </span>
                          <span className="panel-table-body-item-delete">
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
          <div className="col-24">
            <div>
              <input type="date" />
            </div>
            <div className="cart-total">
              Итоговая стоимость: {totalPrice}{" "}
              <i className="far fa-ruble-sign" />
            </div>
            <button className="cart-order-btn">Заказать</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  home: state.home
});

export default connect(mapStateToProps)(CartPage);
