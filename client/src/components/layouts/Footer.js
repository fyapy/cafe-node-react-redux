import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-24 col-lg-12">
            <div className="footer-list-title">Кафе Уютный Кит</div>
            <div className="footer-address">
              Адрес: Г. Казань, Ул. Пушкина 52
            </div>
            <div className="footer-address">Телефон: +77546755783</div>
          </div>
          <div className="col-24 col-lg-6">
            <div className="footer-list-title">Навигация</div>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link to="/cart" className="footer-list-item-link">
                  <i className="fas fa-home" /> Главная
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/cart" className="footer-list-item-link">
                  <i className="fas fa-shopping-cart" /> Корзина
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/contacts" className="footer-list-item-link">
                  <i className="fas fa-map-marked-alt" /> Контакты
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-24 col-lg-6">
            <div className="footer-list-title">Мы в соц. сетях</div>
            <ul className="footer-list">
              <li className="footer-list-item">
                <a
                  href="https://vk.com"
                  target="_blank"
                  className="footer-list-item-link"
                >
                  <i className="fab fa-instagram" /> Наш Instagram
                </a>
              </li>
              <li className="footer-list-item">
                <a
                  href="https://vk.com"
                  target="_blank"
                  className="footer-list-item-link"
                >
                  <i className="fab fa-vk" /> Наш VK
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <i className="far fa-copyright" /> {new Date().getFullYear()} Copyright:
        Cafe.com
      </div>
    </div>
  );
}

export default Footer;
