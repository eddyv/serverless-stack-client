import React, { useState } from "react";
import { Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { Auth } from "aws-amplify";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm(form) {
    return email.length > 0 && password.length > 0;
  }
  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsLoading(true);
    try {
      if (form.checkValidity() === true) {
        setValidated(true);
        await Auth.signIn(email, password);
        props.userHasAuthenticated(true);
        //redirect to homepage
        props.history.push("/");
      } else {
        event.stopPropagation();
        setIsLoading(false);
      }
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
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
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}
