import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";s
import { getHomeData } from "../../actions/homeAction";
import { deleteCategory } from "../../actions/categoriesAction";
import { connect } from "react-redux";

// Component
import PanelNavbar from "./PanelNavbar";

class Categories extends Component {
  // static propTypes = {
  // 	prop: PropTypes
  // }

  componentDidMount() {
    this.props.getHomeData();
  }

  handleDelete = (e, id) => {
    e.preventDefault();

    this.props.deleteCategory(id);
  };

  render() {
    const categories = this.props.home.categories
      .slice()
      .sort((a, b) => b.id - a.id);

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-18">
            <PanelNavbar />
          </div>
          <div className="col-lg-6 d-flex justify-content-end">
            <Link to="/panel/categories/add" className="panel-navbar-add">
              Добавить категорию
            </Link>
          </div>

          <div className="col-24">
            <table className="panel-table">
              <thead className="panel-table-head">
                <tr>
                  <th className="panel-table-head-item">Номер</th>
                  <th className="panel-table-head-item">Изображение</th>
                  <th className="panel-table-head-item">Название</th>
                  <th className="panel-table-head-item">Действия</th>
                </tr>
              </thead>
              <tbody className="panel-table-body">
                {categories.map((cat, id) => (
                  <tr key={cat.id} className="panel-table-body-row">
                    <th className="panel-table-body-item" data-label="Номер">
                      {cat.id}
                    </th>
                    <th
                      className="panel-table-body-item image"
                      data-label="Изображение"
                    >
                      <img src={`/img/${cat.img}`} alt="Img" />
                    </th>
                    <th className="panel-table-body-item" data-label="Название">
                      {cat.name}
                    </th>
                    <th className="panel-table-body-item" data-label="Действия">
                      <Link
                        to={`/panel/categories/edit/${cat.id}`}
                        className="panel-table-body-item-increase"
                      >
                        <i className="far fa-edit" /> Изменить
                      </Link>
                      <span
                        onClick={e => this.handleDelete(e, cat.id)}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home
});

export default connect(
  mapStateToProps,
  { getHomeData, deleteCategory }
)(Categories);
