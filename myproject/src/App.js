import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import "reset-css";

import Login from "./signIn/signIn";
import Register from "./signUp/signUp";
import MyProfile from "./myProfile/myProfile";

// const MyProfile = () => <h1>HELLO</h1>;

const App = (props) => {
  return (
    <Router history={createHistory}>
      
      <Switch>
        <div className="wrapper">
          <Route
            exact
            path={["/", "/sign_in"]}
            render={() => <Login loginEye={props.loginEye} />}
          />
          <Route
            exact
            path="/sign_up"
            render={() => (
              <Register
                registerEye={props.registerEye}
                registerConfirmEye={props.registerConfirmEye}
              />
            )}
          />
          <Route
            exact
            path="/my_profile"
            render={() => <MyProfile message={props.message} users={props.users} />}
          />
        </div>
      </Switch>
    </Router>
  );
};

export default App;
