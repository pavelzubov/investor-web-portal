import Modal from "components/modal/modal";
import InvestPopup from "modules/invest-popup/invest-popup";
import {
  getInvestInfoById,
  investServiceInvestById
} from "modules/invest-popup/services/invest-popup.services";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const InvestPopupContainer = props => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <InvestPopup
        info={props.info.data}
        id={props.id}
        fetchInfo={props.service.getInvestInfoById}
        invest={props.service.investServiceInvestById}
      />
    </Modal>
  );
};

InvestPopupContainer.propTypes = {
  id: PropTypes.string.isRequired,
  currency: PropTypes.string,
  onClose: PropTypes.func
};

const mapStateToProps = state => ({
  info: state.investPopup
});

const mapDispatchToProps = dispath => ({
  service: bindActionCreators(
    {
      getInvestInfoById,
      investServiceInvestById
    },
    dispath
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvestPopupContainer);
