import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    try {
      await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
      //redirect to homepage
      props.history.push("/");
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div className="Login">
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="sample@gmail.com"
            defaultValue=""
            value={email}
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            defaultValue=""
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Button size="lg" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
