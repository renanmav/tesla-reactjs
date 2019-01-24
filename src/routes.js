import React, { Fragment, Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as LoginActions } from "~/store/ducks/login";

import asyncComponent from "./components/AsyncComponent/index";

import Header from "./components/Header";
import SideDrawer from "./components/SideDrawer";

const AsyncHome = asyncComponent(() => import("./pages/Home"));
const AsyncServicos = asyncComponent(() => import("./pages/Servicos"));
const AsyncBlog = asyncComponent(() => import("./pages/Blog"));
const AsyncLogin = asyncComponent(() => import("./pages/Login"));
const AsyncPanel = asyncComponent(() => import("./pages/Panel"));
const AsyncNotFound = asyncComponent(() => import("./pages/NotFound"));
const AsyncForgotPassword = asyncComponent(() =>
  import("./pages/ForgotPassword")
);
const AsyncResetPassword = asyncComponent(() =>
  import("./pages/ResetPassword")
);
const AsyncUserCreate = asyncComponent(() => import("./pages/UserCreate"));
const AsyncPostDetail = asyncComponent(() => import("./pages/PostDetail"));

class Routes extends Component {
  static propTypes = {
    login: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired
    }).isRequired
  };

  render() {
    return (
      <BrowserRouter>
        <div
          style={{
            position: "relative",
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1
          }}
        >
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Fragment>
                  <SideDrawer />
                  <Header />
                  <AsyncHome />
                </Fragment>
              )}
            />
            <Route
              exact
              path="/servicos"
              render={() => (
                <Fragment>
                  <SideDrawer />
                  <Header />
                  <AsyncServicos />
                </Fragment>
              )}
            />
            <Route
              exact
              path="/blog"
              render={() => (
                <Fragment>
                  <SideDrawer />
                  <Header />
                  <AsyncBlog />
                </Fragment>
              )}
            />
            <Route
              exact
              path="/login"
              render={props =>
                this.props.login.isAuthenticated ? (
                  <Redirect
                    to={{ pathname: "/panel", state: { from: props.location } }}
                  />
                ) : (
                  <AsyncLogin />
                )
              }
            />
            <Route
              exact
              path="/panel"
              render={props =>
                this.props.login.isAuthenticated ? (
                  <AsyncPanel />
                ) : (
                  <Redirect
                    to={{ pathname: "/login", state: { from: props.location } }}
                  />
                )
              }
            />
            <Route exact path="/forgot" component={AsyncForgotPassword} />
            <Route exact path="/reset" component={AsyncResetPassword} />
            <Route exact path="/user/create" component={AsyncUserCreate} />
            <Route
              exact
              path="/post/:id"
              render={props => (
                <Fragment>
                  <SideDrawer />
                  <Header />
                  <AsyncPostDetail {...props} />
                </Fragment>
              )}
            />
            <Route
              path="*"
              render={() => (
                <Fragment>
                  <SideDrawer />
                  <Header />
                  <AsyncNotFound />
                </Fragment>
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(LoginActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
