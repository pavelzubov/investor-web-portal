import "./fund-details-description.scss";

import Popover from "components/popover/popover";
import ProgramAvatar from "components/program-avatar/program-avatar";
import { GVButton } from "gv-react-components";
import ProgramDepositContainer from "modules/program-deposit/program-deposit-container";
import ProgramReinvestingWidget from "modules/program-reinvesting/components/program-reinvesting-widget";
import { MANAGER_DETAILS_ROUTE } from "pages/manager/manager.page";
import { PROGRAM_NOTIFICATIONS_ROUTE } from "pages/notifications/notifications.routes";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import replaceParams from "utils/replace-params";

import AboutLevelsContainerComponent from "../../../../../app/components/about-levels/about-levels-container";
import FundDetailsFavorite from "./fund-details-favorite";
import FundDetailsNotification from "./fund-details-notificaton";

const composeManagerUrl = managerId => {
  return replaceParams(MANAGER_DETAILS_ROUTE, {
    ":managerId": managerId
  });
};

export const composeProgramNotificationsUrl = url => {
  return replaceParams(PROGRAM_NOTIFICATIONS_ROUTE, {
    ":id": url
  });
};

class FundDetailsDescription extends PureComponent {
  state = {
    isOpenInvestmentPopup: false,
    isOpenAboutLevels: false,
    anchor: null
  };

  handleOpenAboutLevels = () => {
    this.setState({ isOpenAboutLevels: true });
    this.handleCloseDropdown();
  };
  handleCloseAboutLevels = () => this.setState({ isOpenAboutLevels: false });
  handleOpenDropdown = event => this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });
  handleOpenInvestmentPopup = () => {
    this.setState({ isOpenInvestmentPopup: true });
  };

  handleCloseInvestmentPopup = () => {
    this.setState({ isOpenInvestmentPopup: false });
  };

  render() {
    const { isOpenInvestmentPopup, isOpenAboutLevels, anchor } = this.state;
    const {
      t,
      isInvested,
      fundDescription,
      onReinvestingClick,
      onFavoriteClick,
      isReinvestPending,
      isFavoritePending
    } = this.props;

    const isFavorite =
      fundDescription.personalFundDetails &&
      fundDescription.personalFundDetails.isFavorite;
    return (
      <div className="fund-details-description">
        <div className="fund-details-description__left">
          <div
            className="fund-details-description__avatar"
            onClick={this.handleOpenDropdown}
          >
            <ProgramAvatar
              url={fundDescription.logo}
              level={fundDescription.level}
              alt={fundDescription.title}
              size="big"
            />
          </div>
          {/*<Popover
            horizontal="left"
            vertical="bottom"
            anchorEl={anchor}
            noPadding
            onClose={this.handleCloseDropdown}
          >
            <div className="popover-levels">
              <div className="popover-levels__block">
                <div className="popover-levels__title">
                  {t("fund-details-page.popover.genesis-level")}{" "}
                  {fundDescription.level}
                </div>
                <div className="popover-levels__subtitle">
                  {t("fund-details-page.popover.invest-limit")}
                </div>
                <div className="popover-levels__balance">
                  {fundDescription.availableInvestment}{" "}
                  {fundDescription.currency}
                </div>
              </div>
              <div className="popover-levels__block">
                <div className="popover-levels__text">
                  {t("fund-details-page.popover.text")}
                </div>
                <GVButton
                  variant="text"
                  onClick={this.handleOpenAboutLevels}
                  color="secondary"
                  className="popover-levels__about"
                >
                  {t("fund-details-page.popover.about-levels")} &#8250;
                </GVButton>
              </div>
            </div>
          </Popover>
          <AboutLevelsContainerComponent
            open={isOpenAboutLevels}
            onClose={this.handleCloseAboutLevels}*/}
        </div>
        <div className="fund-details-description__main">
          <div className="fund-details-description__heading">
            {fundDescription.title}
          </div>
          {/*<Link to={composeManagerUrl(fundDescription.manager.id)}>
            <GVButton
              variant="text"
              className="fund-details-description__author-btn"
            >
              {fundDescription.manager.username}
            </GVButton>
          </Link>*/}

          <div className="fund-details-description__info">
            <div className="fund-details-description__strategy-block">
              <h2 className="fund-details-description__subheading">
                {t("fund-details-page.description.strategy")}
              </h2>
              <p className="fund-details-description__text">
                {fundDescription.description}
              </p>
            </div>
            <div className="fund-details-description__short-statistic">
              {/*<div className="fund-details-description__short-statistic-item">
                <span className="fund-details-description__short-statistic-subheading">
                  {t("fund-details-page.description.avToInvest")}
                </span>
                <NumberFormat
                  value={fundDescription.availableInvestment}
                  displayType="text"
                  suffix={` ${fundDescription.currency}`}
                />
              </div>*/}
              <div className="fund-details-description__short-statistic-item">
                <span className="fund-details-description__short-statistic-subheading">
                  {t("fund-details-page.description.entryFee")}
                </span>
                <NumberFormat
                  value={fundDescription.entryFee}
                  displayType="text"
                  suffix=" %"
                />
              </div>
              <div className="fund-details-description__short-statistic-item">
                <span className="fund-details-description__short-statistic-subheading">
                  Exit fee
                </span>
                <NumberFormat
                  value={fundDescription.exitFee}
                  displayType="text"
                  suffix=" %"
                />
              </div>
            </div>
            <div className="fund-details-description__invest-button-container">
              <GVButton
                className="fund-details-description__invest-btn"
                onClick={this.handleOpenInvestmentPopup}
              >
                {t("fund-details-page.description.invest")}
              </GVButton>
            </div>

            <ProgramDepositContainer
              open={isOpenInvestmentPopup}
              id={fundDescription.id}
              onClose={this.handleCloseInvestmentPopup}
            />

            {isInvested && (
              <ProgramReinvestingWidget
                className="fund-details-description__reinvest"
                toggleReinvesting={onReinvestingClick}
                isReinvesting={
                  fundDescription.personalProgramDetails.isReinvest
                }
                disabled={isReinvestPending}
              />
            )}
          </div>
        </div>
        <div className="fund-details-description__right">
          <FundDetailsFavorite
            programId={fundDescription.id}
            isFavorite={isFavorite}
            toggleFavorite={onFavoriteClick}
            disabled={isFavoritePending}
          />
          <FundDetailsNotification
            url={composeProgramNotificationsUrl(fundDescription.url)}
            disabled={isFavoritePending}
          />
        </div>
      </div>
    );
  }
}

export default translate()(FundDetailsDescription);