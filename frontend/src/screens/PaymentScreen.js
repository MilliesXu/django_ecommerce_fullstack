import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/partials/FormContainer";
import Loader from "../components/partials/Loader";
import CheckoutSteps from "../components/partials/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartAction";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cartReducer);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  if (!shippingAddress) {
    navigate("/shipping");
  }

  return (
    <Suspense fallback={<Loader />}>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                id="paypal"
                name="paymentMethod"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button className="mt-4" type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Suspense>
  );
};

export default PaymentScreen;
