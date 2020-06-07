import React from "react";
import "./App.css";
import Header from "./component/layout/Header";
import Users from "./component/users/Users";
import AddUser from "./component/users/AddUser";
import UserDetails from "./component/users/UserDetails";
import UserEdit from "./component/users/UserEdit";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store, { rrfProps } from "./store";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helper/auth";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import LogIn from "./component/auth/LogIn";
import Register from "./component/auth/Register";
import PageNotFound from "./component/layout/PageNotFound";

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <div>
            <Header />
            <div className='container mt-3'>
              <Switch>
                <Route exact path='/' component={UserIsAuthenticated(Users)} />
                <Route
                  exact
                  path='/user/add'
                  component={UserIsAuthenticated(AddUser)}
                />
                <Route
                  exact
                  path='/user/:id'
                  component={UserIsAuthenticated(UserDetails)}
                />
                <Route
                  exact
                  path='/user/edit/:id'
                  component={UserIsAuthenticated(UserEdit)}
                />
                <Route
                  exact
                  path='/login'
                  component={UserIsNotAuthenticated(LogIn)}
                />
                <Route
                  exact
                  path='/register'
                  component={UserIsNotAuthenticated(Register)}
                />
                <Route component={UserIsAuthenticated(PageNotFound)} />
              </Switch>
            </div>
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
