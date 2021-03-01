import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MyLayout } from "./components/Layout/Layout";
import * as actions from "./redux/actions/authAction";

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, [props]);

  return <MyLayout></MyLayout>;
};

const mapStateToProps = (state) => {
  return {
    inAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authcheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
