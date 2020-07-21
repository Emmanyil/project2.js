import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import { Provider } from "react-redux";
import "reset-css";

import { store } from "./store/store";
import Login from "./signIn/signIn";
import Register from "./signUp/signUp";
import MyProfile from "./myProfile/myProfile";

const App = (props) => {
  return (
    <Router history={createHistory}>
      <Provider store={store}>
        <Switch>
          <div className="wrapper">
            <Route exact path={["/", "/sign_in"]} component={Login} />
            <Route exact path="/sign_up" component={Register} />
            <Route
              exact
              path="/my_profile"
              render={() => (
                <MyProfile message={props.message} users={props.users} />
              )}
            />
          </div>
        </Switch>
      </Provider>
    </Router>
  );
};

export default App;
