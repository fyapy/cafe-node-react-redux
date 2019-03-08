import React, { Component } from "react";
import ReactDOM from "react-dom";

export class Index extends Component {
  render() {
    const { children, onClose } = this.props;

    return ReactDOM.createPortal(
      <div className="modal animated fadeIn">
        <div className="modal-content animated zoomIn">
          <button onClick={e => onClose(e, false)} className="modal-close">
            <i className="far fa-times" />
          </button>
          {children}
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
}

export default Index;
