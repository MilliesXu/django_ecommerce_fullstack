import React, { Component, Fragment } from "react";
import { Card, Col } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { productList } from "../../actions/productAction";

export class Product extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    productList: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.productList();
  }

  render() {
    return (
      <Fragment>
        {this.props.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-3 rounded">
              <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
              </Link>

              <Card.Body>
                <Link to={`/product/${product._id}`}>
                  <Card.Title>
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>

                <Card.Text as="div">
                  <div className="my-3">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                      color={"#f8e825"}
                    />
                  </div>
                </Card.Text>

                <Card.Text as="h3">${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productListReducer.products,
});

export default connect(mapStateToProps, { productList })(Product);
