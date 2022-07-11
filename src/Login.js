import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "https://fullstack-auth-app.herokuapp.com/login",
      data: {
        email,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setLogin(true);
        console.log(result);

        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });

        // redirect user to the auth page
        window.location.href = "/auth";
      })
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
  };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="mb-0">Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            name="email"
            type="email"
            value={email}
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword" className="mt-2">
          <Form.Label className="mb-0">Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            name="password"
            type="password"
            value={password}
          />
        </Form.Group>

        <div className="d-grid gap-2 mt-2">
          {/* submit button */}
          <Button
            className="mt-2"
            onClick={(e) => handleSubmit(e)}
            type="submit"
            variant="primary"
          >
            Login
          </Button>
        </div>

        {/* display success message */}
        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
      </Form>
    </>
  );
}
