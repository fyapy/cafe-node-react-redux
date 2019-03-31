import React, { Component } from "react";
import { getHomeData } from "../../actions/homeAction";
import { addToCart } from "../../actions/cartAction";
import { connect } from "react-redux";

// Components
import CategoryCard from "../Categories/CategoryCard";
import ProductsCard from "../Products/ProductsCard";
import Cart from "../Cart/Cart";
import Loader from "../common/Loader";

class Home extends Component {
  constructor(props) {
    super(props);
    this.ProdRefs = [];
  }

  componentDidMount() {
    this.props.getHomeData();
  }

  scrollToProd = (e, id) => {
    e.preventDefault();
    window.scrollTo(0, this.ProdRefs[id].offsetTop);
  };

  addToCart = (e, id) => {
    e.preventDefault();

    this.props.addToCart(id);
  };

  render() {
    const { categories, products } = this.props.home;

    return (
      <div>
        {categories.length <= 0 ? (
          <Loader />
        ) : (
          <React.Fragment>
            <div className="categories">
              <div className="categories-title">Категории</div>
              <div className="container">
                <div className="row justify-content-center">
                  {categories.map((cat, id) => (
                    <CategoryCard
                      category={cat}
                      key={id}
                      scroll={this.scrollToProd}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="products-wrapper">
              {categories.map((cat, cId) => (
                <div
                  className="products"
                  key={cId}
                  ref={input => {
                    this.ProdRefs[cat.id] = input;
                  }}
                >
                  <div className="products-title">{cat.name}</div>
                  <div className="container">
                    <div className="row justify-content-center">
                      {products.filter(p => p.catId === cat.id).length === 0 ? (
                        <div className="products-empty">
                          К сожалению товаров в этой категорий нет.
                        </div>
                      ) : (
                        products
                          .filter(p => p.catId === cat.id)
                          .map((prod, pId) => (
                            <ProductsCard
                              product={prod}
                              key={pId}
                              addToCart={this.addToCart}
                            />
                          ))
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Cart />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home
});

export default connect(
  mapStateToProps,
  { getHomeData, addToCart }
)(Home);
