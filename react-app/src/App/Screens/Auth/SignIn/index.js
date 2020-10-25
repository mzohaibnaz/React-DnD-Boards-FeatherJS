import React, { useState } from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import { connect } from "react-redux";
import { login } from "./../../../feather-client";
import "./index.css";
import appDataLoader from "./../../../utils/appDataLoader";

const SignIn = (props) => {
  const { dispatch } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (email.length <= 0 || password.length <= 0) {
      setErrorMessage("Email & password is required");
      return;
    }
    let credentials = {
      email,
      password,
    };

    login(credentials)
      .then(async (data) => {
        dispatch({ type: "app-loading", state: true });
        const { boards, mediaImages } = await appDataLoader();
        dispatch({
          type: "update-app-data",
          mediaImages,
          boards,
        });

        dispatch({ type: "app-loading", state: false });
        dispatch({ type: "login-user", user: data.user });
      })
      .catch((error) => {
        setErrorMessage("Username/Password is invalid!");
      });
  };

  return (
    <div className="pt-5">
      <h1 className="text-center">Login</h1>

      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="card card-body">
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="with a placeholder"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    required
                    name="password"
                    id="examplePassword"
                    placeholder="password placeholder"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Button
                    className="btn-block"
                    outline
                    color="primary"
                    type="submit"
                  >
                    Login
                  </Button>
                </FormGroup>
              </Form>
              {errorMessage.length > 0 ? (
                <Alert color="danger">{errorMessage}</Alert>
              ) : (
                ""
              )}
              <p className="small-xl pt-3 text-center">
                <span className="text-muted">Not a member?</span>
                <a href="#">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStatetoProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStatetoProps)(SignIn);
