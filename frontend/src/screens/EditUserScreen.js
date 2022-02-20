import React, { useState, useEffect, Suspense } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/partials/Message";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userAction";
import FormContainer from "../components/partials/FormContainer";
import Loader from "../components/partials/Loader";
import { USER_UPDATE_RESET } from "../actions/types";

const EditUserScreen = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetailsReducer = useSelector((state) => state.userDetailsReducer);
  const { user } = userDetailsReducer;
  const userUpdateReducer = useSelector((state) => state.userUpdateReducer);
  const { success: successUpdate } = userUpdateReducer;
  const { errors } = useSelector((state) => state.errorReducer);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser(
        {
          id: id,
          username: email,
          email: email,
          name: name,
          first_name: name,
          is_admin: isAdmin,
        },
        id
      )
    );
    navigate(`/admin/user/${id}/`);
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: USER_UPDATE_RESET,
      });
    } else {
      if (!user.name || user.id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.is_admin);
      }
    }
  }, [user, id, dispatch, successUpdate]);

  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Link to="/admin/userlist">Go Back</Link>

        <FormContainer>
          <h1>Edit User</h1>

          {errors.length > 0 ? (
            <Message variant="danger">{errors}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="isAdmin">
                <Form.Check
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="my-2"
                ></Form.Check>
              </Form.Group>

              <Button type="submit" variant="primary">
                Register
              </Button>
            </Form>
          )}
        </FormContainer>
      </div>
    </Suspense>
  );
};

export default EditUserScreen;
