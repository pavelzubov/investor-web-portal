import { GVButton, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";

import InvestForm from "./components/invest-form";

class InvestPopup extends Component {
  state = {
    isPending: false
  };
  componentDidMount() {
    this.props.fetchInfo(this.props.id);
  }

  handleSubmit = values => {
    this.setState({ isPending: true });
    this.props
      .invest(this.props.id, values.amount)
      .finally(() => this.setState({ isPending: false }));
  };

  render() {
    const { t, info } = this.props;
    if (!info) return null;
    return (
      <div className="dialog">
        <div className="dialog__header">
          <h1>{t("Invest")}</h1>
          <p>{info.title}</p>
        </div>
        <div className="value">
          <div className="value__description">
            {t("Available to invest in program")}
          </div>
          <div className="value__value">
            {info.availableToInvest}{" "}
            <span className="value__currecncy">GVT</span>
          </div>
        </div>
        <div className="value">
          <div className="value__description">
            {t("Available to invest in program")}
          </div>
          <div className="value__value">
            {info.availableInWallet}{" "}
            <span className="value__currecncy">GVT</span>
          </div>
        </div>
        <div className="dialog__form">
          <InvestForm
            info={info}
            onSubmit={this.handleSubmit}
            disabled={this.state.isPending}
          />
        </div>
      </div>
    );
  }
}

InvestPopup.propTypes = {
  fetchInfo: PropTypes.func,
  invest: PropTypes.func,
  info: PropTypes.shape({
    availableInWallet: PropTypes.number,
    availableToInvest: PropTypes.number,
    entryFee: PropTypes.number,
    periodEnds: PropTypes.string,
    rate: PropTypes.number,
    title: PropTypes.string
  })
};

export default translate()(InvestPopup);
