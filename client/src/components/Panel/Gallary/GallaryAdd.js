import React, { Component } from "react";
import Cropper from "react-cropper";
import * as Yup from "yup";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFormik, Form, Field } from "formik";
import { addToGallary } from "../../../actions/gallaryAction";

// Components
import AdminLayout from "../AdminLayout";

export class GallaryAdd extends Component {
  crop = () => {
    this.refs.cropper
      .getCroppedCanvas({
        width: 900,
        height: 600,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high"
      })
      .toBlob(
        blob => {
          this.props.setFieldValue("image", blob);
        },
        "image/jpeg",
        0.95
      );
  };

  handleFileChange = e => {
    this.props.setFieldValue(
      "file",
      URL.createObjectURL(e.currentTarget.files[0])
    );
  };

  render() {
    const { values, errors, isSubmitting } = this.props;

    return (
      <AdminLayout>
        <Form className="col-24 panel-edit">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="modal-form-group">
                <label htmlFor="title" className="modal-form-label">
                  Название
                </label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Название"
                  autoFocus={true}
                  autoComplete="off"
                  className="modal-form-control"
                />
                <div className="modal-form-error">{errors.title}</div>
              </div>
              <div>
                <label
                  htmlFor="file"
                  className="panel-edit-upload panel-navbar-add"
                >
                  Загрузить фото
                </label>
                <input
                  id="file"
                  type="file"
                  name="file"
                  onChange={this.handleFileChange}
                  className="d-none"
                />
                <div className="modal-form-error">{errors.image}</div>
              </div>
              <div className="panel-edit-image">
                <Cropper
                  ref="cropper"
                  src={values.file && values.file}
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
              <div className="modal-form-group">
                <button
                  type="submit"
                  className="panel-edit-upload panel-navbar-add"
                  disabled={isSubmitting}
                >
                  Добавить фото
                </button>
              </div>
            </div>
          </div>
        </Form>
      </AdminLayout>
    );
  }
}

const mapStateToProps = state => ({});

const gallarySchema = Yup.object().shape({
  title: Yup.string().max(255, "Максимум 255 символов"),
  image: Yup.mixed().required("Загрузите фото")
});

export default compose(
  connect(
    mapStateToProps,
    { addToGallary }
  ),
  withFormik({
    mapPropsToValues: () => ({
      title: "",
      file: null,
      image: null
    }),
    validationSchema: gallarySchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      let data = new FormData();
      data.append("image", values.image);
      data.append("title", values.title);

      props.addToGallary(data, props.history);
    }
  })
)(GallaryAdd);
