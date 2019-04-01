import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "../../validation/isEmpty";
import { logoutUser } from "../../actions/authAction";

class Header extends Component {
  state = {
    isMenuOpen: false
  };

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  logout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isMenuOpen } = this.state;
    const isAuth = this.props.auth.isAuthenticated;
    const User = this.props.auth.user;

    return (
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-7">
              <Link to="/" className="header-logo">
                Cafe
              </Link>
            </div>
            <div className="col-xl-10">
              <div
                className="header-toggle d-xl-none"
                onClick={this.toggleMenu}
              >
                <i className="fas fa-bars" />
              </div>
              <ul className={`header-list ${isMenuOpen && "open"}`}>
                <li className="header-list-item">
                  <Link to="/" className="header-list-item-link">
                    Главная
                  </Link>
                </li>
                <li className="header-list-item">
                  <Link to="/cart" className="header-list-item-link">
                    Корзина
                  </Link>
                </li>
                <li className="header-list-item">
                  <Link to="/contacts" className="header-list-item-link">
                    Контакты
                  </Link>
                </li>
                {!isEmpty(User) && User.role > 7 && (
                  <li className="header-list-item">
                    <Link to="/panel" className="header-list-item-link">
                      Панель
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="col-xl-7">
              {isAuth ? (
                <div className="header-control">
                  <Link to="/profile" className="header-control-item">
                    Профиль <i className="far fa-user-circle" />
                  </Link>
                  <a
                    href="/logout"
                    className="header-control-item"
                    onClick={this.logout}
                  >
                    Выйти <i className="far fa-sign-out-alt" />
                  </a>
                </div>
              ) : (
                <div className="header-control">
                  <Link to="/login" className="header-control-item">
                    Вход <i className="fal fa-sign-in-alt" />
                  </Link>
                  <Link to="/register" className="header-control-item">
                    Регистрация <i className="fal fa-user-plus" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
