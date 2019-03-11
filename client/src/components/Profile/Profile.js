import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Profile extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="profile-icon">
              <i className="far fa-user-circle" />
            </div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-orders">
              <div className="profile-orders-title">Ваши заказы</div>
              <div className="profile-orders-empty">
                Вы ещё нечего не заказали(
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Profile);
