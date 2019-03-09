import React, { Component, Fragment } from "react";
// import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/userAction";
import { connect } from "react-redux";

export class User extends Component {
  // static propTypes = {
  // 	prop: PropTypes
  // }

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated) {
      this.props.getCurrentProfile();
    }
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated !== prevProps.auth.isAuthenticated) {
      this.props.getCurrentProfile();
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(User);
