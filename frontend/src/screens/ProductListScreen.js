import React, { useEffect, Suspense } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/partials/Loader";
import { Button, Table, Row, Col } from "react-bootstrap";
import Message from "../components/partials/Message";
import { useDispatch, useSelector } from "react-redux";
import {
  productList,
  productDelete,
  productCreate,
} from "../actions/productAction";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS } from "../actions/types";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productListReducer = useSelector((state) => state.productListReducer);
  const { products } = productListReducer;
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;
  const errorReducer = useSelector((state) => state.errorReducer);
  const { errors } = errorReducer;
  const productDeleteReducer = useSelector(
    (state) => state.productDeleteReducer
  );
  const { success } = productDeleteReducer;
  const productCreateReducer = useSelector(
    (state) => state.productCreateReducer
  );
  const { success: createSuccess, product } = productCreateReducer;

  useEffect(() => {
    dispatch({
      type: PRODUCT_CREATE_RESET,
    });

    if (userInfo && userInfo.is_admin) {
      dispatch(productList());
    } else {
      navigate("/login");
    }

    if (createSuccess) {
      navigate(`/admin/products/${product?.id}/edit`);
    }
  }, [dispatch, userInfo, navigate, success, createSuccess, product]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      dispatch(productDelete(id));
    }
  };

  const createProductHandler = () => {
    dispatch(productCreate());
  };

  return (
    <Suspense fallback={<Loader />}>
      {" "}
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {errors.length > 0 ? (
        <Message variant="danger">{errors}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>$.{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product.id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Suspense>
  );
};

export default ProductListScreen;
