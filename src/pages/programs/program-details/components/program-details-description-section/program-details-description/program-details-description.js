import "./program-details-description.scss";

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
import ProgramDetailsFavorite from "./program-details-favorite";
import ProgramDetailsNotification from "./program-details-notificaton";

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

class ProgramDetailsDescription extends PureComponent {
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
      programDescription,
      onReinvestingClick,
      onFavoriteClick,
      isReinvestPending,
      isFavoritePending
    } = this.props;

    const isFavorite =
      programDescription.personalProgramDetails &&
      programDescription.personalProgramDetails.isFavorite;
    return (
      <div className="program-details-description">
        <div className="program-details-description__left">
          <div
            className="program-details-description__avatar"
            onClick={this.handleOpenDropdown}
          >
            <ProgramAvatar
              url={programDescription.logo}
              level={programDescription.level}
              alt={programDescription.title}
              size="big"
            />
          </div>
          <Popover
            horizontal="left"
            vertical="bottom"
            anchorEl={anchor}
            noPadding
            onClose={this.handleCloseDropdown}
          >
            <div className="popover-levels">
              <div className="popover-levels__block">
                <div className="popover-levels__title">
                  {t("program-details-page.popover.genesis-level")}{" "}
                  {programDescription.level}
                </div>
                <div className="popover-levels__subtitle">
                  {t("program-details-page.popover.invest-limit")}
                </div>
                <div className="popover-levels__balance">
                  {programDescription.availableInvestment}{" "}
                  {programDescription.currency}
                </div>
              </div>
              <div className="popover-levels__block">
                <div className="popover-levels__text">
                  {t("program-details-page.popover.text")}
                </div>
                <GVButton
                  variant="text"
                  onClick={this.handleOpenAboutLevels}
                  color="secondary"
                  className="popover-levels__about"
                >
                  {t("program-details-page.popover.about-levels")} &#8250;
                </GVButton>
              </div>
            </div>
          </Popover>
          <AboutLevelsContainerComponent
            open={isOpenAboutLevels}
            onClose={this.handleCloseAboutLevels}
          />
        </div>
        <div className="program-details-description__main">
          <h1 className="program-details-description__heading">
            {programDescription.title}
          </h1>
          <Link to={composeManagerUrl(programDescription.manager.id)}>
            <GVButton
              variant="text"
              className="program-details-description__author-btn"
            >
              {programDescription.manager.username}
            </GVButton>
          </Link>

          <div className="program-details-description__info">
            <h2 className="program-details-description__subheading">
              {t("program-details-page.description.strategy")}
            </h2>
            <p className="program-details-description__text">
              {programDescription.description}
            </p>
            <div className="program-details-description__short-statistic">
              <div className="program-details-description__short-statistic-item">
                <span className="program-details-description__short-statistic-subheading">
                  {t("program-details-page.description.avToInvest")}
                </span>
                <NumberFormat
                  value={programDescription.availableInvestment}
                  displayType="text"
                  suffix={` ${programDescription.currency}`}
                />
              </div>
              <div className="program-details-description__short-statistic-item">
                <span className="program-details-description__short-statistic-subheading">
                  {t("program-details-page.description.entryFee")}
                </span>
                <NumberFormat
                  value={programDescription.entryFee}
                  displayType="text"
                  suffix=" %"
                />
              </div>
              <div className="program-details-description__short-statistic-item">
                <span className="program-details-description__short-statistic-subheading">
                  {t("program-details-page.description.successFee")}
                </span>
                <NumberFormat
                  value={programDescription.successFee}
                  displayType="text"
                  suffix=" %"
                />
              </div>
            </div>
            <GVButton
              className="program-details-description__invest-btn"
              onClick={this.handleOpenInvestmentPopup}
            >
              {t("program-details-page.description.invest")}
            </GVButton>

            <ProgramDepositContainer
              open={isOpenInvestmentPopup}
              id={programDescription.id}
              onClose={this.handleCloseInvestmentPopup}
            />

            {isInvested && (
              <ProgramReinvestingWidget
                className="program-details-description__reinvest"
                toggleReinvesting={onReinvestingClick}
                isReinvesting={
                  programDescription.personalProgramDetails.isReinvest
                }
                disabled={isReinvestPending}
              />
            )}
          </div>
        </div>
        <div className="program-details-description__right">
          <ProgramDetailsFavorite
            programId={programDescription.id}
            isFavorite={isFavorite}
            toggleFavorite={onFavoriteClick}
            disabled={isFavoritePending}
          />
          <ProgramDetailsNotification
            url={composeProgramNotificationsUrl(programDescription.url)}
            disabled={isFavoritePending}
          />
        </div>
      </div>
    );
  }
}

export default translate()(ProgramDetailsDescription);
