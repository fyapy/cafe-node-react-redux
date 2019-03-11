import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import jwt_decode from "jwt-decode";
import "cropperjs/dist/cropper.css";
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
import EditProduct from "./components/Products/EditProduct";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import User from "./components/common/User";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/common/PrivateRoute";
import Categories from "./components/Panel/Categories";
import AddCategory from "./components/Categories/AddCategory";
import EditCategory from "./components/Categories/EditCategory";
import CartPage from "./components/Cart/CartPage";

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
  render() {
    return (
      <Provider store={Store}>
        <Router history={history}>
          <div>
            <Header toggleModal={this.toggleModal} />
            <User />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/cart" component={CartPage} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/panel" component={Panel} />
              <PrivateRoute
                exact
                path="/panel/products/add"
                component={AddProduct}
              />
              <PrivateRoute
                exact
                path="/panel/products/edit/:id"
                component={EditProduct}
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
              <PrivateRoute
                exact
                path="/panel/categories/edit/:id"
                component={EditCategory}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
