import React, { Component } from "react";
// import PropTypes from 'prop-types'
import Cropper from "react-cropper";
import { connect } from "react-redux";
import { getProduct, editProduct } from "../../actions/productAction";
import { getHomeData } from "../../actions/homeAction";
import isEmpty from "../../validation/isEmpty";

export class EditProduct extends Component {
  // static propTypes = {
  // 	prop: PropTypes
  // }

  state = {
    name: "",
    price: "",
    img: "",
    catId: "",
    file: "",
    image: "",
    errors: {}
  };

  crop = () => {
    this.setState({
      image: this.refs.cropper.getCroppedCanvas().toDataURL()
    });
  };

  handleFileChange = e => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    });
  };

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
    this.props.getHomeData();
  }

  componentDidUpdate(prevProps) {
    const { product } = this.props.panel;
    const { name } = this.state;

    if (
      !isEmpty(product) &&
      name !== product.name &&
      product !== prevProps.panel.product
    ) {
      this.setState({
        name: product.name,
        img: `/img/${product.img}`,
        price: product.price,
        catId: product.catId
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, price, catId, image } = this.state;
    const { panel, history } = this.props;

    this.props.editProduct(
      panel.product.id,
      { name, price, catId, image },
      history
    );
  };

  render() {
    const { name, price, img, file, image, catId, errors } = this.state;
    const { categories } = this.props.home;

    return (
      <div className="container">
        <form className="row justify-content-center" onSubmit={this.onSubmit}>
          <div className="col-lg-9">
            <div className="modal-form-group">
              <label htmlFor="name" className="modal-form-label">
                Название
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Название"
                autoFocus={true}
                onChange={this.onChange}
                autoComplete="off"
                className="modal-form-control"
              />
              <div className="modal-form-error">{errors.name}</div>
            </div>
            <div className="modal-form-group">
              <label htmlFor="price" className="modal-form-label">
                Цена
              </label>
              <input
                type="text"
                name="price"
                id="price"
                value={price}
                placeholder="Цена"
                onChange={this.onChange}
                autoComplete="off"
                className="modal-form-control"
              />
              <div className="modal-form-error">{errors.price}</div>
            </div>
            <div className="modal-form-group">
              <label htmlFor="catId" className="modal-form-label">
                Категория
              </label>
              <select
                name="catId"
                id="catId"
                value={catId}
                onChange={this.onChange}
                className="modal-form-select"
              >
                {categories.map((cat, id) => (
                  <option value={cat.id} key={id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="modal-form-error">{errors.catId}</div>
            </div>
            <div>
              <label
                htmlFor="file"
                className="panel-edit-file panel-navbar-add"
              >
                Загрузить превью
              </label>
              <input
                type="file"
                id="file"
                onChange={this.handleFileChange}
                className="d-none"
              />
            </div>
            <div className="panel-edit-image">
              <Cropper
                ref="cropper"
                src={file}
                viewMode={2}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  margin: "0 auto",
                  maxHeight: "230px"
                }}
                aspectRatio={16 / 9}
                guides={false}
                cropend={this.crop}
                ready={this.crop}
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="panel-edit-preview">
              <img src={isEmpty(image) ? img : image} alt="img" />
            </div>
            <div className="modal-form-group">
              <button
                type="submit"
                className="panel-edit-upload panel-navbar-add"
              >
                Изменить товар
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  panel: state.panel,
  home: state.home
});

export default connect(
  mapStateToProps,
  { getProduct, editProduct, getHomeData }
)(EditProduct);
