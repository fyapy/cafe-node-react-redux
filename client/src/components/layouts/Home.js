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

  state = {
    isScrollShow: false
  };

  componentDidMount() {
    this.props.getHomeData();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = e => {
    const offsetTop = window.scrollY;

    if (offsetTop > 400) {
      this.setState({ isScrollShow: true });
    } else {
      this.setState({ isScrollShow: false });
    }
  };

  scrollTop = e => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  scrollToProd = (e, id) => {
    e.preventDefault();
    window.scrollTo({ top: this.ProdRefs[id].offsetTop, behavior: "smooth" });
  };

  addToCart = (e, id) => {
    e.preventDefault();

    this.props.addToCart(id);
  };

  render() {
    const { categories, products } = this.props.home;
    const { isScrollShow } = this.state;

    return (
      <div>
        <div
          className="home-parallax"
          style={{ backgroundImage: `url(/img/homeBG.jpg)` }}
        >
          <div className="container">
            <div className="home-parallax-title">Кафе Уютный Кит</div>
            <div className="home-parallax-desc">
              Мы уютное и ламповое кафе, в котором вы сможете расслабится и,
              почувствовать себя как дома. В вашем распоряжений удобные пуфики
              на которых вам будет комфортно наслождатся вкусной и очень
              разнообразным меню. А так же очнь добрый и отзывчивый персонал.
              Заходи :)
            </div>
            <div className="home-parallax-tel">
              Подробности по тел.: +7 937 770 67 67
            </div>
          </div>
        </div>

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

        <div
          className={`scroll ${isScrollShow && "show"}`}
          onClick={this.scrollTop}
        >
          <i className="fas fa-angle-double-up" />
        </div>
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
