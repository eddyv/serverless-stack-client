import React, { useState } from "react";
import { Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { Auth } from "aws-amplify";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";

export default function Login(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }
  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsLoading(true);
    try {
      if (form.checkValidity() === true) {
        await Auth.signIn(fields.email, fields.password);
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
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="sample@gmail.com"
            defaultValue=""
            value={fields.email}
            autoFocus
            onChange={handleFieldChange}
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
            value={fields.password}
            onChange={handleFieldChange}
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
