import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import {AppRoute} from "../../const.js";

const PrivateRoute = (props) => {
  const {render, path, exact, isAuthed} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routerProps) => {
        return isAuthed ? (
          render(routerProps)
        ) : (
          <Redirect push to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthed: getAuthStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
