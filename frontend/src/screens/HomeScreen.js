import React, { Suspense, useEffect } from "react";
import { Row } from "react-bootstrap";
import Product from "../components/products/Product";
import Loader from "../components/partials/Loader";
import Message from "../components/partials/Message";
import Paginate from "../components/partials/Paginate";
import { useSelector, useDispatch } from "react-redux";
import { productList } from "../actions/productAction";
import { useLocation } from "react-router-dom";

const HomeScreen = () => {
  const { errors } = useSelector((state) => state.errorReducer);
  const { products, page, pages } = useSelector(
    (state) => state.productListReducer
  );
  const dispatch = useDispatch();
  const location = useLocation();
  let keyword = location.search;

  useEffect(() => {
    dispatch(productList(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <h1>Latest Products</h1>

        {errors.length > 0 ? (
          <Message variant="danger">{errors}</Message>
        ) : (
          <div>
            <Row>
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default HomeScreen;
