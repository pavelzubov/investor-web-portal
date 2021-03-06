import Page from "components/page/page";
import ProgramNotificationsContainer from "modules/program-notifications/program-notifications-container";
import ProgramDetailsNavigation from "pages/programs/program-details/components/program-details-navigation/program-details-navigation";
import React from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

const ProgramNotificationPage = ({ t, match, service }) => {
  const { id } = match.params;
  return (
    <Page title={t("notifications.program.title")}>
      <ProgramDetailsNavigation goBack={service.goBack} />
      <h1>{t("notifications.program.title")}</h1>
      <ProgramNotificationsContainer id={id} />
    </Page>
  );
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ goBack }, dispatch)
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(ProgramNotificationPage);
