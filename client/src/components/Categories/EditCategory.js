import React, { Component } from "react";
// import PropTypes from 'prop-types'
import Cropper from "react-cropper";
import { connect } from "react-redux";
import { getCategory, editCategory } from "../../actions/categoriesAction";
import isEmpty from "../../validation/isEmpty";

export class EditCategory extends Component {
  // static propTypes = {
  // 	prop: PropTypes
  // }
  state = {
    name: "",
    img: "",
    file: "",
    image: "",
    errors: {}
  };

  crop = () => {
    this.setState({
      image: this.refs.cropper
        .getCroppedCanvas({
          width: 200,
          height: 200
        })
        .toDataURL()
    });
  };

  handleFileChange = e => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    });
  };

  componentDidMount() {
    this.props.getCategory(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props.panel;
    const { name } = this.state;

    if (
      !isEmpty(category) &&
      name !== category.name &&
      category !== prevProps.panel.category
    ) {
      this.setState({ name: category.name, img: `/img/${category.img}` });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, price, image, catId } = this.state;
    const { history, panel } = this.props;

    this.props.editCategory(
      panel.category.id,
      { name, price, image, catId },
      history
    );
  };

  render() {
    const { name, img, file, image, errors } = this.state;

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
                aspectRatio={4 / 4}
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
                Изменить категирию
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  panel: state.panel
});

export default connect(
  mapStateToProps,
  { getCategory, editCategory }
)(EditCategory);
