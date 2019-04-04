import React from "react";
import { NavLink } from "react-router-dom";

function PanelNavbar() {
  return (
    <ul className="panel-navbar">
      <li className="panel-navbar-item">
        <NavLink
          to="/panel/products"
          className="panel-navbar-link"
          activeClassName="current"
        >
          Товары
        </NavLink>
      </li>
      <li className="panel-navbar-item">
        <NavLink
          to="/panel/categories"
          className="panel-navbar-link"
          activeClassName="current"
        >
          Категории
        </NavLink>
      </li>
      <li className="panel-navbar-item">
        <NavLink
          to="/panel/orders"
          className="panel-navbar-link"
          activeClassName="current"
        >
          Заказы
        </NavLink>
      </li>
      <li className="panel-navbar-item">
        <NavLink
          to="/panel/gallary"
          className="panel-navbar-link"
          activeClassName="current"
        >
          Галерея
        </NavLink>
      </li>
    </ul>
  );
}

export default PanelNavbar;
