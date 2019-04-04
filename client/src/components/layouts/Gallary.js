import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGallary } from "../../actions/gallaryAction";

// Components
import Loader from "../common/Loader";

export class Gallary extends Component {
  componentDidMount() {
    this.props.fetchGallary();
  }

  render() {
    const { gallary } = this.props.home;

    return (
      <div className="container">
        <div className="contacts-title">Галерея</div>

        {gallary.length === 0 ? (
          <Loader />
        ) : (
          <div className="gallary-masonry">
            {gallary.map(gal => (
              <div className="gallary-masonry-item" key={gal.id}>
                <img src={`/img/gallary/${gal.img}`} alt={gal.title} />
                <span className="gallary-masonry-item-title">{gal.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home
});

export default connect(
  mapStateToProps,
  { fetchGallary }
)(Gallary);
