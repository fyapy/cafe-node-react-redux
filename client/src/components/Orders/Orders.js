import React, { Component } from "react";
import { getHomeData } from "../../actions/homeAction";
import { deleteProduct } from "../../actions/productAction";
import { getOrders } from "../../actions/ordersAction";
import { connect } from "react-redux";

// Component
import PanelNavbar from "../Panel/PanelNavbar";
import Loader from "../common/Loader";

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders();
    this.props.getHomeData();
  }

  handleDelete = (e, id) => {
    e.preventDefault();
    this.props.deleteProduct(id);
  };

  render() {
    const products = this.props.home.products
      .slice()
      .sort((a, b) => b.id - a.id);
    const { orders } = this.props.panel;

    return (
      <div className="container">
        <div className="row">
          <div className="col-24 col-lg-18">
            <PanelNavbar />
          </div>

          <div className="col-24">
            {orders !== null ? (
              <table className="panel-table">
                <thead className="panel-table-head">
                  <tr>
                    <th className="panel-table-head-item">Номер</th>
                    <th className="panel-table-head-item">Товары</th>
                    <th className="panel-table-head-item">Телефон</th>
                    <th className="panel-table-head-item">Кол-во</th>
                    <th className="panel-table-head-item">Комментарий</th>
                    <th className="panel-table-head-item">Стоимость</th>
                    <th className="panel-table-head-item">Дата</th>
                  </tr>
                </thead>
                <tbody className="panel-table-body">
                  {orders.map((order, id) => (
                    <tr key={order.id} className="panel-table-body-row">
                      <th className="panel-table-body-item" data-label="Номер">
                        {order.id}
                      </th>
                      <th
                        className="panel-table-body-item image masonry"
                        data-label="Товары"
                      >
                        {order.items.map((item, iId) => {
                          const prod =
                            products.length !== 0 &&
                            products.find(p => p.id === item.productId);

                          return (
                            <div
                              key={iId}
                              className="panel-table-body-item-masonry"
                            >
                              <img src={`/img/${prod.img}`} alt={prod.name} />
                              <span className="panel-table-body-item-masonry-row">
                                {prod.name}
                              </span>
                              <span className="panel-table-body-item-masonry-row">
                                {prod.price} <i className="far fa-ruble-sign" />
                              </span>
                              <span className="panel-table-body-item-masonry-row">
                                {item.quantity} Шт.
                              </span>
                            </div>
                          );
                        })}
                      </th>
                      <th
                        className="panel-table-body-item"
                        data-label="Телефон"
                      >
                        {order.phone ? order.phone : "Пусто"}
                      </th>
                      <th
                        className="panel-table-body-item"
                        data-label="Кол-во чел."
                      >
                        {order.customersCount} Чел.
                      </th>
                      <th
                        className="panel-table-body-item"
                        data-label="Комментарий"
                      >
                        {order.comment ? order.comment : "Пусто"}
                      </th>
                      <th
                        className="panel-table-body-item"
                        data-label="Стоимость"
                      >
                        {order.amount} <i className="far fa-ruble-sign" />
                      </th>
                      <th className="panel-table-body-item" data-label="Дата">
                        {new Date(order.orderedOn).toLocaleString()}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home,
  panel: state.panel
});

export default connect(
  mapStateToProps,
  { getHomeData, deleteProduct, getOrders }
)(Orders);