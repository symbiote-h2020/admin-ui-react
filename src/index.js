import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import Home from "./components/home/home";
import Success from "./components/success";
import UserControlPanel from "./components/user-cpanel/user-control-panel";
import AdminControlPanel from "./components/admin-cpanel/admin-cpanel";

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
              <Route path="/administration/success" component={Success} />
              <Route path="/administration/user/cpanel" component={UserControlPanel} />
              <Route path="/administration/admin/cpanel" component={AdminControlPanel} />
          </Switch>
      </Router>
  </Provider>
  , document.querySelector('.my-container'));
