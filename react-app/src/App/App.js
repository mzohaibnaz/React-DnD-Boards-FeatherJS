import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { connect } from "react-redux";
import Dashboard from "./Screens/Dashboard";
import SignIn from "./Screens/Auth/SignIn";
import Loading from "react-fullscreen-loading";

import appDataLoader from "./utils/appDataLoader";
function App(props) {
  const { isLoading, user, dispatch } = props;

  //if (isLoading) {
  //return <Loading loading background="#0079bf" loaderColor="#fff" />;
  //} else {
  return user ? <Dashboard /> : <SignIn />;
  //}
}

const mapStatetoProps = (state) => {
  return {
    isLoading: state.root.loading,
    user: state.auth.user,
  };
};

export default connect(mapStatetoProps)(App);
