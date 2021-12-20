import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;

    if (error !== prevProps.error) {
      if (error.msg.detail) alert.error(`Error: ${error.msg.detail}`);
      else if (error.msg) alert.error(`Error: ${error.msg}`);
      // if (message !== prevProps.message) {
      //   if (message.leadDeleted) alert.success(message.leadDeleted);
      //   if (message.leadCreated) alert.success(message.leadCreated);
      //   if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
      // }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errorReducer,
  message: state.messageReducer,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
