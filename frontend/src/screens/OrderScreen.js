import React, { useEffect, Suspense } from "react";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/partials/Loader";
import { Link, useParams } from "react-router-dom";
import Message from "../components/partials/Message";
import { getOrderDetails } from "../actions/orderAction";

const OrderScreen = () => {
  const { id } = useParams();
  const orderDetails = useSelector((state) => state.orderDetailReducer);
  const { order } = orderDetails;
  const { errors } = useSelector((state) => state.errorReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id, dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      {errors.length > 0 ? (
        <Message variant="danger">{errors}</Message>
      ) : (
        <div>
          <h1>Order: {order.id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user?.name}{" "}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user?.email}`}>
                      {order.user?.email}
                    </a>{" "}
                  </p>

                  <p>
                    <strong>Shipping : </strong>
                    {order?.shipping_address?.address},{" "}
                    {order?.shipping_address?.city}
                    {"  "}
                    {order?.shipping_address?.postal_code},{"  "}
                    {order?.shipping_address?.country}
                  </p>

                  {order.is_delivered ? (
                    <Message variant="success">
                      Delivered at {order.delivered_at}
                    </Message>
                  ) : (
                    <Message variant="warning">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>

                  <p>
                    <strong>Method : </strong>
                    {order.paymentMethod}
                  </p>
                  {order.is_paid ? (
                    <Message variant="success">Paid on {order.paid_at}</Message>
                  ) : (
                    <Message variant="warning">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>

                  {order.order_items?.length === 0 ? (
                    <Message variant="info">Your order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.order_items?.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>

                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>

                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>order Summary</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>
                        $
                        {order.order_items
                          ? order.order_items
                              .reduce(
                                (acc, item) => acc + item.price * item.qty,
                                0
                              )
                              .toFixed(2)
                          : 0}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shipping_price}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.tax_price}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total Price</Col>
                      <Col>${order.total_price}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </Suspense>
  );
};

export default OrderScreen;
