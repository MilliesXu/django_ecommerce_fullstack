import React, { useEffect, Suspense } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/partials/Loader";
import { Button, Table } from "react-bootstrap";
import Message from "../components/partials/Message";
import { useDispatch, useSelector } from "react-redux";
import { getListOrders } from "../actions/orderAction";
import { useNavigate } from "react-router-dom";

const OrderListScreen = () => {
  const orderListAdminReducer = useSelector((state) => state.orderListReducer);
  const { orders } = orderListAdminReducer;
  const userReducer = useSelector((state) => state.userReducer);
  const { userInfo } = userReducer;
  const errorReducer = useSelector((state) => state.errorReducer);
  const { errors } = errorReducer;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.is_admin) {
      dispatch(getListOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <Suspense fallback={<Loader />}>
      <h1>Orders</h1>

      {errors.length > 0 ? (
        <Message variant="danger">{errors}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Price</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.created_at.substring(0, 10)}</td>
                <td>$.{order.total_price}</td>
                <td>
                  {order.is_paid ? (
                    order.paid_at.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.is_delivered ? (
                    order.delivered_at.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order.id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Suspense>
  );
};

export default OrderListScreen;
