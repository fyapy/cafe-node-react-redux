import React, { Component } from "react";
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";
import { compose } from "redux";
import { connect } from "react-redux";
import isEmpty from "../../validation/isEmpty";

export class CartForm extends Component {
  render() {
    const { errors, touched, isSubmitting, cart } = this.props;

    return (
      <Form className="col-24 row">
        <div className="col-24 col-lg-12">
          <div className="modal-form-group">
            <label htmlFor="date" className="modal-form-label">
              Дата<span className="modal-form-label-required">*</span>
            </label>
            <Field
              type="date"
              id="date"
              name="date"
              className="modal-form-control"
            />
            {errors.cartNotEmpty && (
              <div className="modal-form-error">{errors.cartNotEmpty}</div>
            )}
            {errors.date && touched.date && (
              <div className="modal-form-error">{errors.date}</div>
            )}
          </div>
          <div className="modal-form-group">
            <label htmlFor="time" className="modal-form-label">
              Время<span className="modal-form-label-required">*</span>
            </label>
            <Field
              type="time"
              id="time"
              name="time"
              className="modal-form-control"
            />
            {errors.time && touched.time && (
              <div className="modal-form-error">{errors.time}</div>
            )}
          </div>
          <div className="modal-form-group">
            <label htmlFor="phone" className="modal-form-label">
              Телефон
              <span className="modal-form-label-required">*</span>
            </label>
            <Field
              type="text"
              name="phone"
              id="phone"
              placeholder="Ваш номер телефона"
              className="modal-form-control"
            />
            {errors.phone && touched.phone && (
              <div className="modal-form-error">{errors.phone}</div>
            )}
          </div>
        </div>
        <div className="col-24 col-lg-12">
          <div className="modal-form-group">
            <label htmlFor="customersCount" className="modal-form-label">
              Кол-во человек
              <span className="modal-form-label-required">*</span>
            </label>
            <Field
              type="text"
              id="customersCount"
              name="customersCount"
              placeholder="Кол-во человек"
              className="modal-form-control"
            />
            {errors.customersCount && touched.customersCount && (
              <div className="modal-form-error">{errors.customersCount}</div>
            )}
          </div>
          <div className="modal-form-group">
            <label htmlFor="comment" className="modal-form-label">
              Комментарий к заказу
            </label>
            <Field
              component="textarea"
              name="comment"
              id="comment"
              className="modal-form-control"
              placeholder="Личные пожелания.."
            />
            {errors.comment && touched.comment && (
              <div className="modal-form-error">{errors.comment}</div>
            )}
          </div>
          <div className="cart-total">
            {cart.success && (
              <div className="col-24 cart-total-success">
                Заказ сделан успешно, спасибо)
              </div>
            )}
            <span>
              Итоговая стоимость: {cart.totalPrice}{" "}
              <i className="far fa-ruble-sign" />
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cart-order-btn"
            >
              Заказать
            </button>
          </div>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  home: state.home
});

const phoneRegExp = /^((\+7|7|8)+([0-9]){10})$/;

const cartSchema = Yup.object().shape({
  cartNotEmpty: Yup.boolean().oneOf([true], "Корзина пустая"),
  date: Yup.date().required("Дата пустая"),
  time: Yup.string().required("Время пустое"),
  phone: Yup.string()
    .matches(phoneRegExp, "Не валидный номер телефона, 89543028277")
    .required("Телефон пустой"),
  customersCount: Yup.number()
    .typeError("Допустимы только цифры")
    .min(1, "Минимум 1 человек")
    .required("Кол-во человек пустое"),
  comment: Yup.string().max(255, "Не более 255 символов")
});

export default compose(
  connect(mapStateToProps),
  withFormik({
    mapPropsToValues: ({ cart }) => ({
      cartNotEmpty: !isEmpty(cart.cart),
      date: "",
      time: "",
      phone: "",
      customersCount: "",
      comment: ""
    }),
    validationSchema: cartSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values);
    }
  })
)(CartForm);
