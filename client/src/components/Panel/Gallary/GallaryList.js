import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchGallary, deleteGallary } from "../../../actions/gallaryAction";

// Components
import AdminLayout from "../AdminLayout";
import Loader from "../../common/Loader";

export class GallaryList extends Component {
  componentDidMount() {
    this.props.fetchGallary();
  }

  handleDelete = id => {
    this.props.deleteGallary(id);
  };

  render() {
    const { gallary } = this.props.home;

    return (
      <AdminLayout>
        <div className="col-lg-6 d-flex justify-content-end">
          <Link to="/panel/gallary/add" className="panel-navbar-add">
            Добавить фото
          </Link>
        </div>

        {gallary.length === 0 ? (
          <Loader />
        ) : (
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
                {gallary.map(gal => (
                  <tr key={gal.id} className="panel-table-body-row">
                    <th className="panel-table-body-item" data-label="Номер">
                      {gal.id}
                    </th>
                    <th
                      className="panel-table-body-item image"
                      data-label="Изображение"
                    >
                      <img src={`/img/gallary/${gal.img}`} alt="Img" />
                    </th>
                    <th className="panel-table-body-item" data-label="Название">
                      {gal.title}
                    </th>
                    <th className="panel-table-body-item" data-label="Действия">
                      <span
                        onClick={e => this.handleDelete(gal.id)}
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
  { fetchGallary, deleteGallary }
)(GallaryList);
