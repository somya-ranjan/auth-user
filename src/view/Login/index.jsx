import React, { useState } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignIn } from "../../store/actions";
import errorHandler from "../../utility/errorHandler";

function Login() {
  // // initial state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // // local state
  const [isLoading, setLoading] = useState(false);

  // // function
  const handelSubmit = async (err, value) => {
    setLoading(true);
    await axios
      .post("https://reqres.in/api/login", {
        email: value.email,
        password: value.password,
      })
      .then(function (response) {
        dispatch(userSignIn());
        localStorage.setItem("authToken", response?.data?.token);
        navigate("/user");
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        errorHandler(error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} md={6} lg={5} xl={4}>
          <Card>
            <CardBody>
              <h4 className="text-center">Login</h4>{" "}
              <AvForm onValidSubmit={handelSubmit}>
                <AvField
                  name="email"
                  label="Email"
                  type="email"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: "Please enter a email",
                    },
                  }}
                />
                <AvField
                  name="password"
                  label="Password"
                  type="password"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: "Please enter password",
                    },
                  }}
                />
                <Button color="primary" disabled={isLoading} className="w-100">
                  {isLoading ? "Login..." : "Submit"}
                </Button>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
