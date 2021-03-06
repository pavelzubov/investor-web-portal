import Dialog from "components/dialog/dialog";
import {
  clearDepositProgramInfo,
  clearInvestSubmit
} from "modules/program-deposit/actions/program-deposit.actions";
import ProgramDepositPopup from "modules/program-deposit/components/program-deposit-popup";
import {
  getDepositProgramInfoById,
  investServiceInvestById
} from "modules/program-deposit/services/program-deposit.services";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { alertMessageActions } from "../../shared/modules/alert-message/actions/alert-message-actions";

const ProgramDepositContainer = props => {
  const handleClose = () => {
    props.onClose();
    props.service.clearDepositProgramInfo();
    props.service.clearInvestSubmit();
  };
  const handleInvest = amount => {
    props.service.notifySuccess("Request to buy tokens sent successfully");
    props.service.investServiceInvestById(props.id, amount).then(handleClose);
  };
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <ProgramDepositPopup
        submitInfo={props.submitInfo}
        currency={props.currency}
        info={props.info.data}
        id={props.id}
        fetchInfo={props.service.getDepositProgramInfoById}
        invest={handleInvest}
      />
    </Dialog>
  );
};

ProgramDepositContainer.propTypes = {
  open: PropTypes.bool,
  id: PropTypes.string.isRequired,
  currency: PropTypes.string,
  onClose: PropTypes.func,
  service: PropTypes.shape({
    getDepositProgramInfoById: PropTypes.func,
    clearDepositProgramInfo: PropTypes.func,
    investServiceInvestById: PropTypes.func,
    clearInvestSubmit: PropTypes.func
  })
};

const mapStateToProps = state => ({
  info: state.programDeposit.info,
  submitInfo: state.programDeposit.submit,
  currency: state.accountSettings.currency
});

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      getDepositProgramInfoById,
      clearDepositProgramInfo,
      investServiceInvestById,
      clearInvestSubmit,
      notifySuccess: alertMessageActions.success
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramDepositContainer);
