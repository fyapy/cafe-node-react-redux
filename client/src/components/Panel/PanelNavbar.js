import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

export class PanelNavbar extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // };

  render() {
    const { pathname } = this.props.location;

    return (
      <ul className="panel-navbar">
        <li className="panel-navbar-item">
          <Link
            to="/panel"
            className={`panel-navbar-link ${pathname === "/panel" &&
              "current"}`}
          >
            Товары
          </Link>
        </li>
        <li className="panel-navbar-item">
          <Link
            to="/panel/categories"
            className={`panel-navbar-link ${pathname === "/panel/categories" &&
              "current"}`}
          >
            Категории
          </Link>
        </li>
        <li className="panel-navbar-item">
          <Link
            to="/panel/orders"
            className={`panel-navbar-link ${pathname === "/panel/orders" &&
              "current"}`}
          >
            Заказы
          </Link>
        </li>
      </ul>
    );
  }
}

export default withRouter(PanelNavbar);
