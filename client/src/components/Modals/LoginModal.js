import React, { Component } from "react";
import loginValidate from "../../validation/Login";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAction";

// Components
import Modal from "./index";

export class LoginModal extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    const { loginErrors } = this.props.errors;
    if (loginErrors !== prevProps.errors.loginErrors) {
      this.setState({ errors: loginErrors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { errors, isValid } = loginValidate(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }

    this.props.loginUser(this.state, this.props.onClose);
  };

  render() {
    const { email, password, errors } = this.state;
    const { onClose } = this.props;

    return (
      <Modal onClose={onClose}>
        <form onSubmit={this.onSubmit}>
          <div className="modal-form-group">
            <label htmlFor="email" className="modal-form-label">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              autoFocus={true}
              onChange={this.onChange}
              className="modal-form-control"
            />
            <div className="modal-form-error">{errors.email}</div>
          </div>
          <div className="modal-form-group">
            <label htmlFor="password" className="modal-form-label">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={this.onChange}
              className="modal-form-control"
            />
            <div className="modal-form-error">{errors.password}</div>
          </div>
          <button className="modal-form-btn">Войти</button>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginModal);
