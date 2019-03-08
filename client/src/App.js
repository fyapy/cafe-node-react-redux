import React, { Component } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import jwt_decode from "jwt-decode";
import "./sass/main.sass";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authAction";

import { Provider } from "react-redux";
import Store from "./Store";

// Components
import Header from "./components/layouts/Header";
import Home from "./components/layouts/Home";
import Panel from "./components/Panel/Panel";
import AddProduct from "./components/Products/AddProduct";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import LoginModal from "./components/Modals/LoginModal";
import RegisterModal from "./components/Modals/RegisterModal";
import User from "./components/common/User";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/common/PrivateRoute";
import Categories from "./components/Panel/Categories";
import AddCategory from "./components/Categories/AddCategory";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  Store.dispatch(setCurrentUser(decoded));
}

const history = createHistory();

class App extends Component {
  state = {
    isModalAuth: false
  };

  toggleModal = (e, name) => {
    e.preventDefault();
    this.setState({ isModalAuth: name });
  };

  render() {
    const { isModalAuth } = this.state;

    return (
      <Provider store={Store}>
        <Router history={history}>
          <div>
            {isModalAuth === "LoginModal" && (
              <LoginModal onClose={this.toggleModal} history={history} />
            )}
            {isModalAuth === "RegisterModal" && (
              <RegisterModal onClose={this.toggleModal} />
            )}

            <Header toggleModal={this.toggleModal} />
            <User />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/panel" component={Panel} />
              <PrivateRoute
                exact
                path="/panel/product/add"
                component={AddProduct}
              />
              <PrivateRoute
                exact
                path="/panel/categories"
                component={Categories}
              />
              <PrivateRoute
                exact
                path="/panel/categories/add"
                component={AddCategory}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
