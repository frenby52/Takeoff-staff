import React from "react";
import {connect} from "react-redux";
import {Router, Route, Switch} from "react-router-dom";
import ContactsPage from "../contacts-page/contacts-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {Operation as UserOperation} from "../../reducer/user/user";
import history from "../../history.js";
import PrivateRoute from "../private-route/private-route.jsx";
import {AppRoute} from "../../const.js";
import Page404 from "../page-404/page-404.jsx";

const ContactsPageWrapped = withActiveItem(ContactsPage);

const App = (props) => {
  const {login} = props;

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.LOGIN}
          render={() => <SignIn onSignInButtonClick={login} />}
        />
        <PrivateRoute exact path={AppRoute.ROOT}
          render={() => <ContactsPageWrapped />}
        />
        <Route
          render={() => <Page404 />}
        />
      </Switch>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login(data) {
    dispatch(UserOperation.login(data));
  },
});

export {App};
export default connect(null, mapDispatchToProps)(App);
