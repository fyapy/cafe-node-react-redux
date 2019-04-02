import React, { Component } from "react";
import image from "../../img/salad-product.jpg";

export class Gallary extends Component {
  render() {
    return (
      <div className="container">
        <div className="contacts-title">Галерея</div>
        <div className="gallary-masonry">
          <div className="gallary-masonry-item">
            <img src={image} />
            <span className="gallary-masonry-item-title">Утный столик</span>
          </div>
          <div className="gallary-masonry-item">
            <img src={image} />
            <span className="gallary-masonry-item-title">Утный столик</span>
          </div>
          <div className="gallary-masonry-item">
            <img src={image} />
            <span className="gallary-masonry-item-title">Утный столик</span>
          </div>
          <div className="gallary-masonry-item">
            <img src={image} />
            <span className="gallary-masonry-item-title">Утный столик</span>
          </div>
          <div className="gallary-masonry-item">
            <img src={image} />
            <span className="gallary-masonry-item-title">Утный столик</span>
          </div>
          <div className="gallary-masonry-item">
            <img src={image} />
            <span className="gallary-masonry-item-title">Утный столик</span>
          </div>
          <div className="gallary-masonry-item">
            <img src={image} />
            <span className="gallary-masonry-item-title">Утный столик</span>
          </div>
          <div className="gallary-masonry-item">
            <img src={image} />
            <span className="gallary-masonry-item-title">Утный столик</span>
          </div>
          <div className="gallary-masonry-item">
            <img src={image} />
            <span className="gallary-masonry-item-title">Утный столик</span>
          </div>
          <div className="gallary-masonry-item">
            <img src={image} />
            <span className="gallary-masonry-item-title">Утный столик</span>
          </div>
          <div className="gallary-masonry-item">
            <img src={image} />
            <span className="gallary-masonry-item-title">Утный столик</span>
          </div>
          <div className="gallary-masonry-item">
            <img src={image} />
            <span className="gallary-masonry-item-title">Утный столик</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallary;
