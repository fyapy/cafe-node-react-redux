import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
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
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import User from "./components/common/User";
import Profile from "./components/Profile/Profile";
import CartPage from "./components/Cart/CartPage";
import NoMatch from "./components/layouts/NoMatch";
import Contacts from "./components/layouts/Contacts";
import Footer from "./components/layouts/Footer";
import Gallary from "./components/layouts/Gallary";

// Admin Components
import PrivateRoute from "./components/common/PrivateRoute";
import ProductsList from "./components/Panel/Products/ProductsList";
import AddProduct from "./components/Panel/Products/AddProduct";
import EditProduct from "./components/Panel/Products/EditProduct";
import Categories from "./components/Panel/Categories/CategoriesList";
import AddCategory from "./components/Panel/Categories/AddCategory";
import EditCategory from "./components/Panel/Categories/EditCategory";
import OrdersList from "./components/Panel/Orders/OrdersList";
import GallaryList from "./components/Panel/Gallary/GallaryList";
import GallaryAdd from "./components/Panel/Gallary/GallaryAdd";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  Store.dispatch(setCurrentUser(decoded));
}

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router history={history}>
          <div>
            <Header />
            <User />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/cart" component={CartPage} />
              <Route exact path="/contacts" component={Contacts} />
              <Route exact path="/gallary" component={Gallary} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute
                exact
                path="/panel/products"
                component={ProductsList}
              />
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
              <PrivateRoute exact path="/panel/orders" component={OrdersList} />
              <PrivateRoute
                exact
                path="/panel/gallary"
                component={GallaryList}
              />
              <PrivateRoute
                exact
                path="/panel/gallary/add"
                component={GallaryAdd}
              />

              <Route component={NoMatch} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
