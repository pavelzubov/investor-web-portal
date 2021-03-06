import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";

const ProgramWithdrawTop = ({ t, availableToWithdraw, title }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("withdraw-program.title")}</h2>
        <p>{title}</p>
      </div>
      <div className="dialog-field">
        <div className="dialog-field__description">
          {t("withdraw-program.available-to-withdraw")}
        </div>
        <div className="dialog-field__value">{availableToWithdraw} GVT</div>
      </div>
    </div>
  );
};

ProgramWithdrawTop.propTypes = {
  availableToWithdraw: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default translate()(ProgramWithdrawTop);
