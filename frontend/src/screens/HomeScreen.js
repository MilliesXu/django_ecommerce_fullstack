import React, { Suspense, useEffect } from "react";
import { Row } from "react-bootstrap";
import Product from "../components/products/Product";
import Loader from "../components/partials/Loader";
import Message from "../components/partials/Message";
import { useSelector, useDispatch } from "react-redux";
import { productList } from "../actions/productAction";

const HomeScreen = () => {
  const { errors } = useSelector((state) => state.errorReducer);
  const { products } = useSelector((state) => state.productListReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productList());
  }, [dispatch]);

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <h1>Latest Products</h1>

        {errors.length > 0 ? (
          <Message variant="danger">{errors}</Message>
        ) : (
          <Row>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </Row>
        )}
      </Suspense>
    </div>
  );
};

export default HomeScreen;
