import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "../../validation/isEmpty";

class Header extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // };
  state = {
    isMenuOpen: false
  };

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  render() {
    const { toggleModal } = this.props;
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
                <i class="fas fa-bars" />
              </div>
              <ul className={`header-list ${isMenuOpen && "open"}`}>
                <li className="header-list-item">
                  <Link to="/" className="header-list-item-link">
                    Главная
                  </Link>
                </li>
                <li className="header-list-item">
                  <a href="/" className="header-list-item-link">
                    Категории
                  </a>
                </li>
                <li className="header-list-item">
                  <a href="/" className="header-list-item-link">
                    Товары
                  </a>
                </li>
                <li className="header-list-item">
                  <a href="/" className="header-list-item-link">
                    Галерея
                  </a>
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

export default connect(mapStateToProps)(Header);
