import "./root.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import platformActions from "../actions/platform-actions";
import store from "../store/index";
import history from "../utils/history";
import RootRoutes from "./root.routes";

class Root extends Component {
  componentDidMount() {
    this.props.fetchPlatformSettings();
  }
  render() {
    return (
      <div className="app">
        <div className="app__body">
          <RootRoutes />
        </div>
      </div>
    );
  }
}

const RootContainer = connect(
  null,
  dispatch => ({
    fetchPlatformSettings: () => dispatch(platformActions.fetchPlatformSettings)
  }),
  null,
  { pure: false }
)(Root);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootContainer />
    </ConnectedRouter>
  </Provider>
);

export default App;