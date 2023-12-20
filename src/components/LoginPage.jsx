import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Form, Message } from "semantic-ui-react";

import { saveUser } from "../utility/userData";

/**
 * @component
 * @description This comonent use to display login screen
 * @param {Function} onLogin this is call back function which use to set user on login
 * @returns {JSX.Element} A React element that renders a login screen.
 */

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [invalidFields, setInvalidFields] = useState({});

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data?.status === "success") {
        onLogin(data.player);
        saveUser(data.player);
        navigate("/game-list");
      } else {
        setInvalidFields({
          invalidCredentials: "Your username or password are incorrect!",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      let usernameError = !formData.username ? "Username is required." : "";
      let passwordError = !formData.password ? "Password is required." : "";
      setInvalidFields({ username: usernameError, password: passwordError });
    } else {
      setInvalidFields({});
      handleLogin();
    }
  };

  return (
    <Grid centered>
      <Form
        error={invalidFields?.invalidCredentials ? true : false}
        className="login-form"
      >
        <Message error content="Your username or password are incorrect!" />

        <Form.Input
          width={16}
          name="username"
          id="form-input-control-user-name"
          placeholder="Username"
          icon="user"
          value={formData.username}
          error={
            invalidFields?.username
              ? {
                  content: invalidFields.username,
                  pointing: "above",
                }
              : invalidFields?.invalidCredentials
              ? true
              : false
          }
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
            setInvalidFields({
              ...invalidFields,
              username: "",
              invalidCredentials: "",
            });
          }}
        />
        <Form.Input
          name="password"
          id="form-input-control-password"
          placeholder="Password"
          icon="lock"
          type='password'
          value={formData.password}
          error={
            invalidFields?.password
              ? {
                  content: invalidFields.password,
                  pointing: "above",
                }
              : invalidFields?.invalidCredentials
              ? true
              : false
          }
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            setInvalidFields({
              ...invalidFields,
              password: "",
              invalidCredentials: "",
            });
          }}
        />
        <Form.Button
          id="form-button-control-public"
          content="Login"
          icon={"right chevron"}
          labelPosition="right"
          basic
          size="small"
          onClick={() => {
            validateForm();
          }}
        />
      </Form>
    </Grid>
  );
}
