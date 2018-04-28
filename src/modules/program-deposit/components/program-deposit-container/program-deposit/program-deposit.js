import { withFormik, Field } from "formik";
import NumberFormat from "react-number-format";
import React from "react";
import Yup from "yup";

import FormError from "../../../../../shared/components/form/form-error/form-error";
import InputText from "../../../../../shared/components/form/input-text/input-text";
import PopupButtons from "../../../../popup/components/popup-buttons/popup-buttons";
import PopupHeader from "../../../../popup/components/popup-header/popup-header";
import ProgramAvatar from "../../../../../components/program-avatar/program-avatar";

import "./program-deposit.css";

const ProgramDeposit = ({
  values,
  programDeposit,
  isSubmitting,
  handleSubmit,
  closePopup,
  error
}) => {
  const calculateManagerCurrency = () => {
    return ((+values.amount || 0) * programDeposit.gvtRate).toFixed(2);
  };
  return (
    <div className="popup">
      <PopupHeader header="Buy Tokens" onClose={closePopup} />
      <form id="programDepositForm" onSubmit={handleSubmit}>
        <div className="program-deposit__info">
          <div className="program-deposit__info-cell">
            <div className="program-deposit__trader">
              <div className="program-deposit__avatar">
                <ProgramAvatar
                  imgUrl={programDeposit.logo}
                  level={programDeposit.level}
                />
              </div>
              <div className="program-deposit__name">
                {programDeposit.title}
              </div>
            </div>
          </div>
          <div className="program-deposit__info-cell">
            <div className="metric">
              <div className="metric__value">
                <NumberFormat
                  value={programDeposit.availableInvestments}
                  decimalScale={4}
                  displayType="text"
                />
                <div className="metric__bubble">GVT</div>
              </div>
              <div className="metric__description">Available To Invest</div>
            </div>
          </div>
          <div className="program-deposit__info-cell program-deposit__available">
            <div className="metric">
              <div className="metric__value">
                <NumberFormat
                  value={programDeposit.gvtWalletAmount}
                  decimalScale={4}
                  displayType="text"
                />
                <div className="metric__bubble">GVT</div>
              </div>
              <div className="metric__description">Your GVT</div>
            </div>
          </div>
        </div>
        <div className="program-deposit__calculator">
          <div className="program-deposit__calculator-cell input-gvt">
            <div className="input-gvt__value">
              <Field
                number
                name="amount"
                placeholder="0"
                controllClass="input-gvt__amount"
                component={InputText}
                decimalScale={2}
                allowNegative={false}
              />
            </div>
            <div className="input-gvt__description">Enter GVT amount</div>
          </div>
          <div className="program-deposit__calculator-cell calculated-usd">
            <div className="metric">
              <div className="metric__value label-usd__value">
                {calculateManagerCurrency()}
              </div>
              <div className="metric__description">
                Amount in {programDeposit.currency}
              </div>
            </div>
          </div>
        </div>

        <FormError error={error} />
        <PopupButtons
          submitLabel="Buy Tokens"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={closePopup}
          submitButtonId="programWithdrawSubmit"
        />
      </form>
    </div>
  );
};

export default withFormik({
  displayName: "programDepositForm",
  mapPropsToValues: () => ({
    amount: ""
  }),
  validationSchema: ({
    programDeposit: { gvtWalletAmount, availableInvestments }
  }) => {
    const maxVal = Math.min(gvtWalletAmount, availableInvestments);
    const maxValText =
      gvtWalletAmount < availableInvestments
        ? "Available GVT"
        : "Available To Invest";
    const scheme = Yup.object().shape({
      amount: Yup.number()
        .typeError("Amount must be a number.")
        .moreThan(0, "Amount must be greater than zero")
        .max(maxVal, "Amount must not be greater than " + maxValText)
        .required("Amount is required.")
    });
    return scheme;
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    props.submitPopup(values, setSubmitting);
  }
})(ProgramDeposit);