import React, { useState, useEffect, Suspense } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/partials/Message";
import { useDispatch, useSelector } from "react-redux";
import { productDetail, productUpdate } from "../actions/productAction";
import FormContainer from "../components/partials/FormContainer";
import Loader from "../components/partials/Loader";
import { PRODUCT_UPDATE_RESET } from "../actions/types";

const ProductEditScreen = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const errorReducer = useSelector((state) => state.errorReducer);
  const { errors } = errorReducer;
  const navigate = useNavigate();

  const productDetailReducer = useSelector(
    (state) => state.productDetailReducer
  );
  const { product } = productDetailReducer;
  const productUpdateReducer = useSelector(
    (state) => state.productUpdateReducer
  );
  const { success: successUpdate } = productUpdateReducer;

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (typeof image !== "string") formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("count_in_stock", countInStock);
    formData.append("category", category);
    formData.append("description", description);

    dispatch(productUpdate(formData, id));
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: PRODUCT_UPDATE_RESET,
      });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product.id !== id) {
        dispatch(productDetail(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.count_in_stock);
        setDescription(product.description);
      }
    }
  }, [product, dispatch, id, navigate, successUpdate]);

  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Link to="/admin/productlist">Go Back</Link>

        <FormContainer>
          <h1>Edit Product</h1>

          {errors.length > 0 ? (
            <Message variant="danger">{errors}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Enter Image"
                  onChange={(e) => setImage(e.target.files[0])}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="countInStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button className="my-2" type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </div>
    </Suspense>
  );
};

export default ProductEditScreen;
