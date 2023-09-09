import React, { useState } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignIn } from "../../store/actions";

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
        alert(error?.response?.data?.error || "Opps! Something went wrong");
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={5}>
          <Card>
            <h6 className="text-center">Login</h6>
            <CardBody>
              {" "}
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
                  {isLoading ? "Loading..." : "Submit"}
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
