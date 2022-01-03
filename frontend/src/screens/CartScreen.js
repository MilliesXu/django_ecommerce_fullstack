import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartAction";
import Message from "../components/partials/Message";

const CartScreen = () => {
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const qty = parseInt(queryParams.get("qty"));
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && qty) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Message variants="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.count_in_stock).keys()].map((qty) => (
                        <option key={qty + 1} value={qty + 1}>
                          {qty + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </h2>
              $(
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
              )
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button
              type="submit"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkOutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
