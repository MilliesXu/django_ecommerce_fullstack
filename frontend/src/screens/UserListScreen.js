import React, { useEffect, Suspense, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/partials/Loader";
import { Button, Table } from "react-bootstrap";
import Message from "../components/partials/Message";
import { useDispatch, useSelector } from "react-redux";
import { getListUsers } from "../actions/userAction";
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userListReducer);
  const errorReducer = useSelector((state) => state.errorReducer);
  const userReducer = useSelector((state) => state.userReducer);
  const { users } = userList;
  const { errors } = errorReducer;
  const { userInfo } = userReducer;

  useEffect(() => {
    if (userInfo && userInfo.is_admin) {
      dispatch(getListUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  const deleteHandler = (id) => {
    console.log(id);
  };

  return (
    <Suspense fallback={<Loader />}>
      <h1>Users</h1>

      {errors.length > 0 ? (
        <Message variant="danger">{errors}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  {user.is_admin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user.id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user.id)}
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

export default UserListScreen;
