import React, { useEffect, Suspense, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { productDetail, productCreateReview } from "../actions/productAction";
import Loader from "../components/partials/Loader";
import Message from "../components/partials/Message";
import Rating from "../components/products/Rating";
import { PRODUCT_CREATE_REVIEW_RESET } from "../actions/types.js";

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetailReducer);
  const { errors } = useSelector((state) => state.errorReducer);
  const { product } = productDetails;
  const { userInfo } = useSelector((state) => state.userReducer);
  const { success } = useSelector((state) => state.productCreateReviewReducer);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment("");

      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET,
      });
    }

    dispatch(productDetail(id));
  }, [dispatch, id, success]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productCreateReview({
        product: id,
        rating: rating,
        comment: comment,
      })
    );
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Suspense fallback={<Loader />}>
        {errors.length > 0 ? (
          <Message variant="danger">{errors}</Message>
        ) : (
          <div>
            <Row>
              <Col lg={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col lg={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.num_reviews} reviews`}
                      color={"#f8e825"}
                    />
                  </ListGroup.Item>

                  <ListGroup.Item>Price ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description : {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col lg={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.count_in_stock > 0
                            ? "In stock"
                            : "Out of stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.count_in_stock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col xs="auto" className="my-1">
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.count_in_stock).keys()].map(
                                (qty) => (
                                  <option key={qty + 1} value={qty + 1}>
                                    {qty + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        disabled={product.count_in_stock <= 0}
                        type="button"
                      >
                        ADD TO CART
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <h4>Reviews</h4>
                {product.reviews.length === 0 && (
                  <Message variant="info">No Reviews</Message>
                )}

                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review.id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} color="#f8e825" />
                      <p>{review.created_at.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    <h4>Write A Review</h4>

                    {success && (
                      <Message variant="success">Review Submitted</Message>
                    )}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select ...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="comment">
                          <Form.Label>Review</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button
                          type="submit"
                          variant="primary"
                          className="my-2"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message variant="info">
                        Please <Link to="/login">Login</Link> To Write A Review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default ProductScreen;
