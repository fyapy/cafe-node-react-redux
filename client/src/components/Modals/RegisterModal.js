import React, { Component } from "react";

// Components
import Modal from "./index";

export class RegisterModal extends Component {
  render() {
    const { onClose } = this.props;

    return (
      <Modal onClose={onClose}>
        <div>Я окно регистраций</div>
      </Modal>
    );
  }
}

export default RegisterModal;
