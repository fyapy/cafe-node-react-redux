import React, { Component } from "react";
// import PropTypes from "prop-types";
import Cropper from "react-cropper";
import { addCategory } from "../../actions/categoriesAction";
import { connect } from "react-redux";

// Components
import PanelNavbar from "../Panel/PanelNavbar";

export class AddCategory extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // };

  state = {
    name: "",
    image: null,
    file: null,
    errors: {},
    ready: false
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
      file: URL.createObjectURL(e.target.files[0]),
      ready: true
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, image } = this.state;

    this.props.addCategory(
      {
        name,
        image
      },
      this.props.history
    );
  };

  render() {
    const { name, file, errors, ready } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-24">
            <PanelNavbar />
          </div>

          <form className="col-24 panel-edit" onSubmit={this.onSubmit}>
            <div className="row justify-content-center">
              <div className="col-8">
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
                      maxHeight: "230px"
                    }}
                    aspectRatio={4 / 4}
                    guides={false}
                    cropend={this.crop}
                    ready={this.crop}
                  />
                </div>
                {ready && (
                  <div className="modal-form-group">
                    <button
                      type="submit"
                      className="panel-edit-upload panel-navbar-add"
                    >
                      Добавить категирию
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
  { addCategory }
)(AddCategory);
