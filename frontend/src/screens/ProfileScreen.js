import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../components/partials/Message";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import Loader from "../components/partials/Loader";
import {
  ERROR,
  ERROR_RESET,
  USER_UPDATE_PROFILE_RESET,
} from "../actions/types";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetailsReducer);
  const { user } = userDetails;
  const userLogin = useSelector((state) => state.userReducer);
  const { userInfo } = userLogin;
  const { errors } = useSelector((state) => state.errorReducer);
  const userUpdateProfile = useSelector(
    (state) => state.userUpdateProfileReducer
  );
  const { success } = userUpdateProfile;

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch({
        type: ERROR,
        payload: "Password do not match",
      });
    } else {
      dispatch(
        updateUserProfile({
          id: user.id,
          name: name,
          email: email,
          password: password,
        })
      );
      dispatch({
        type: ERROR_RESET,
      });
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({
          type: USER_UPDATE_PROFILE_RESET,
        });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, user, dispatch, success]);

  return (
    <Suspense fallback={<Loader />}>
      {errors.length > 0 && <Message variant="danger">{errors}</Message>}
      <Row>
        <Col md={3}>
          <h2>Users Profile</h2>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>

        <Col md={9}>
          <h2>My Orders</h2>
        </Col>
      </Row>
    </Suspense>
  );
};

export default ProfileScreen;