import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "https://fullstack-auth-app.herokuapp.com/register",
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        setRegister(true);
        console.log(result);
      })
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
  };

  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="mb-0">Email address</Form.Label>
          <Form.Control
            name="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword" className="mt-2">
          <Form.Label className="mb-0">Password</Form.Label>
          <Form.Control
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
            Register
          </Button>
        </div>

        {/* display success message */}
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}
      </Form>
    </>
  );
}
