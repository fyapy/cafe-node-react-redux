import React, { Component } from "react";
import loginValidate from "../../validation/Login";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAction";

export class Register extends Component {
  state = {
    login: "",
    email: "",
    password: "",
    password2: "",
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

    this.props.loginUser(this.state, this.props.history);
  };

  render() {
    const { login, email, password, password2, errors } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <form onSubmit={this.onSubmit} className="col-12">
            <div className="modal-form-group">
              <label htmlFor="login" className="modal-form-label">
                Логин
              </label>
              <input
                type="text"
                name="login"
                id="login"
                value={login}
                autoFocus={true}
                onChange={this.onChange}
                className="modal-form-control"
              />
              <div className="modal-form-error">{errors.login}</div>
            </div>
            <div className="modal-form-group">
              <label htmlFor="email" className="modal-form-label">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
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
            <div className="modal-form-group">
              <label htmlFor="password2" className="modal-form-label">
                Повторите пароль
              </label>
              <input
                type="password"
                name="password2"
                id="password2"
                value={password2}
                onChange={this.onChange}
                className="modal-form-control"
              />
              <div className="modal-form-error">{errors.password}</div>
            </div>
            <button className="modal-form-btn">Войти</button>
          </form>
        </div>
      </div>
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
)(Register);
