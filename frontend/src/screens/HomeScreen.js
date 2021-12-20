import React, { Component, Suspense } from "react";
import { Row } from "react-bootstrap";
import Product from "../components/products/Product";
import Loader from "../components/partials/Loader";

class HomeScreen extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={<Loader />}>
          <h1>Latest Products</h1>
          <Row>
            <Product />
          </Row>
        </Suspense>
      </div>
    );
  }
}

export default HomeScreen;
