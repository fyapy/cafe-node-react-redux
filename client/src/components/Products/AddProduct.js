import React, { Component } from "react";
// import PropTypes from "prop-types";
import Cropper from "react-cropper";
import { addProduct } from "../../actions/productAction";
import { connect } from "react-redux";

// Components
import PanelNavbar from "../Panel/PanelNavbar";

export class AddProduct extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // };

  state = {
    name: "",
    image: "",
    price: "",
    file: null,
    catId: null,
    errors: {},
    ready: false
  };

  crop = () => {
    this.setState({
      image: this.refs.cropper
        .getCroppedCanvas({
          width: 350,
          height: 197
        })
        .toDataURL()
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = e => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      ready: true
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, price, image, catId } = this.state;
    this.props.addProduct(
      {
        name,
        price,
        image,
        catId
      },
      this.props.history
    );
  };

  render() {
    const { name, price, file, errors, ready } = this.state;
    const { categories } = this.props.home;

    return (
      <div className="container">
        <div className="row">
          <div className="col-24">
            <PanelNavbar />
          </div>

          <form className="col-24 panel-edit" onSubmit={this.onSubmit}>
            <div className="row justify-content-center">
              <div className="col-lg-8">
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
                    placeholder="Цена"
                    value={price}
                    autoFocus={true}
                    onChange={this.onChange}
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
              </div>
              <div className="col-lg-8">
                <div>
                  <label
                    htmlFor="file"
                    className="panel-edit-upload panel-navbar-add"
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
                      maxHeight: "200px"
                    }}
                    aspectRatio={16 / 9}
                    guides={false}
                    cropend={this.crop}
                    ready={this.crop}
                  />
                </div>
                {ready && (
                  <div className="modal-form-group">
                    <button type="submit" className="panel-navbar-add">
                      Добавить товар
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
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
  { addProduct }
)(AddProduct);
