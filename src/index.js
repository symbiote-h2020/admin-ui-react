import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import Home from "./components/home/home";
import Success from "./components/success";
import PasswordReset from "./components/password-reset";
import ResendVerificationEmail from "./components/resend-verification-email";
import UserControlPanel from "./components/user-cpanel/user-control-panel";
import AdminControlPanel from "./components/admin-cpanel/admin-cpanel";
import Denied from "./components/denied";
import UserPrivateRoute from "./components/user-private-route";
import AdminPrivateRoute from "./components/admin-private-route";
import SuccessPrivateRoute from "./components/success-private-route";
import PasswordResetPrivateRoute from "./components/password-reset-private-route";
import ResendVerificationEmailPrivateRoute from "./components/resend-verification-email-private-route";
import 'react-select/dist/react-select.css';
import { RESEND_VERIFICATION_EMAIL_URL, RESET_PASSWORD_URL } from "./configuration";

export const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(promise),
    // other store enhancers if any
));

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// export const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
      <Router>
          <Switch>
              <Route exact path="/administration" component={Home} />
              <SuccessPrivateRoute exact path="/administration/success" component={Success} />
              <PasswordResetPrivateRoute exact path={RESET_PASSWORD_URL} component={PasswordReset} />
              <ResendVerificationEmailPrivateRoute exact path={RESEND_VERIFICATION_EMAIL_URL} component={ResendVerificationEmail} />
              <UserPrivateRoute exact path="/administration/user/cpanel" component={UserControlPanel}/>
              <AdminPrivateRoute
                  exact path="/administration/admin/cpanel"
                  component={AdminControlPanel}
                  deniedComponent={Denied}
              />
              <Redirect to="/administration" />
          </Switch>
      </Router>
  </Provider>
  , document.querySelector('.my-container'));
