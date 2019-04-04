import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getHomeData } from "../../../actions/homeAction";
import { deleteProduct } from "../../../actions/productAction";
import { connect } from "react-redux";

// Component
import Loader from "../../common/Loader";
import AdminLayout from "../AdminLayout";

class Panel extends Component {
  componentDidMount() {
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

    return (
      <AdminLayout>
        <div className="col-24 col-lg-6 d-flex justify-content-end">
          <Link to="/panel/products/add" className="panel-navbar-add">
            Добавить товар
          </Link>
        </div>

        {products.length <= 0 ? (
          <Loader />
        ) : (
          <div className="col-24">
            <table className="panel-table">
              <thead className="panel-table-head">
                <tr>
                  <th className="panel-table-head-item">Номер</th>
                  <th className="panel-table-head-item">Изображение</th>
                  <th className="panel-table-head-item">Название</th>
                  <th className="panel-table-head-item">Цена</th>
                  <th className="panel-table-head-item">Действия</th>
                </tr>
              </thead>
              <tbody className="panel-table-body">
                {products.map((prod, id) => (
                  <tr key={prod.id} className="panel-table-body-row">
                    <th className="panel-table-body-item" data-label="Номер">
                      {prod.id}
                    </th>
                    <th
                      className="panel-table-body-item image"
                      data-label="Изображение"
                    >
                      <img src={`/img/${prod.img}`} alt="Img" />
                    </th>
                    <th className="panel-table-body-item" data-label="Название">
                      {prod.name}
                    </th>
                    <th className="panel-table-body-item" data-label="Цена">
                      {prod.price} <i className="far fa-ruble-sign" />
                    </th>
                    <th className="panel-table-body-item" data-label="Действия">
                      <Link
                        to={`/panel/products/edit/${prod.id}`}
                        className="panel-table-body-item-increase"
                      >
                        <i className="far fa-edit" /> Изменить
                      </Link>
                      <span
                        onClick={e => this.handleDelete(e, prod.id)}
                        className="panel-table-body-item-delete"
                      >
                        <i className="far fa-trash-alt" /> Удалить
                      </span>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminLayout>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home
});

export default connect(
  mapStateToProps,
  { getHomeData, deleteProduct }
)(Panel);
