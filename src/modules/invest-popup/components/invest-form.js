import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

class InvestForm extends Component {
  state = {
    amountInCurrency: ""
  };
  handleChange = event => {
    this.props.handleChange(event);
  };
  render() {
    const { t, handleSubmit, disabled, info, values } = this.props;
    return (
      <form id="invest-form" onSubmit={handleSubmit}>
        <GVFormikField
          type="text"
          name="amount"
          label="Amount to invest"
          component={GVTextField}
          adornment="GVT"
          autoComplete="off"
          onChange={this.handleChange}
        />
        ={values.amount / info.rate}
        <div>
          Entry fee
          {info.entryFee}%{(values.amount * info.entryFee) / 100} GVT
        </div>
        <GVButton
          type="submit"
          id="signUpFormSubmit"
          className="signup-form__submit-button"
          disabled={disabled}
        >
          {t("Confirm")}
        </GVButton>
      </form>
    );
  }
}

InvestForm.propTypes = {};

export default compose(
  translate(),
  withFormik({
    displayName: "invest-form",
    mapPropsToValues: () => ({
      amount: ""
    }),
    // validationSchema: validationSchema,
    handleSubmit: (values, { props }) => {
      props.onSubmit(values);
    }
  })
)(InvestForm);
