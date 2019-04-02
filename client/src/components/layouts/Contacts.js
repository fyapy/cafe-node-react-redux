import React, { Component } from "react";

export class Contacts extends Component {
  render() {
    return (
      <div className="container">
        <div className="contacts-title">Контакты</div>
        <div className="row">
          <div className="col-24 col-lg-12">
            <div className="contacts-tel">
              Наш адрес: Г. Казань, Ул. Пушкина 52
            </div>
            <div className="contacts-tel">Наш телефон: +77546755783</div>
            <div className="contacts-about">
              Мы уютное и ламповое кафе, в котором вы сможете расслабится и,
              почувствовать себя как дома. В вашем распоряжений удобные пуфики
              на которых вам будет комфортно наслождатся вкусной и очень
              разнообразным меню. А так же очнь добрый и отзывчивый персонал.
              Заходи :)
            </div>
          </div>
          <div className="col-24 col-lg-12">
            <iframe
              title="map"
              className="contacts-map"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad9724ed6a2235ad7af437861ab8def02e3a1d1419c78e3948e362a6eb6fb760f&amp;source=constructor"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Contacts;
