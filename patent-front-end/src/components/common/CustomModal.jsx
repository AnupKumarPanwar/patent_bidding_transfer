import React, { Component } from "react";
import { Button, DialogContainer } from "react-md";
import axios from "axios";
import { ipAddress } from "../../controller";
import { changeModal } from "../../store/actions/modal/ModalActions";
import { connect } from "react-redux";

class CustomModal extends Component {
  state = {
    visible: this.props.showModal
  };

  componentWillReceiveProps (props) {
    this.setState({visible: props.visible});
  }

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
    this.props.changeModal(false, 'Pider', 'Patent management over Blockchain');
  };

  render() {
    const visible = this.state.visible;
    const actions = [
      {
        onClick: this.hide,
        primary: true,
        children: "Okay"
      }
    ];

    console.log(visible);

    return (
      <DialogContainer
        id="speed-boost"
        visible={visible}
        title={this.props.modalTitle}
        onHide={this.hide}
        aria-describedby="speed-boost-description"
        modal
        actions={actions}
      >
        <p id="speed-boost-description" className="md-color--secondary-text">
          {this.props.modalDesc}
          </p>
      </DialogContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    showModal: ownProps.visible,
    modalTitle: state.modal.title,
    modalDesc: state.modal.desc
  };
};

const mapDispatchToProps = {
  changeModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomModal);
