import React, { useState } from "react";
import { Form, Segment, Message, Divider, Button } from "semantic-ui-react";
import { setToken } from "../../util/auth";
import axios from "axios";
import catchErrors from "../../util/catchErrors";

const LoginForm = ({ user, handleChange, setIsLogin }) => {
  const [formLoading, setFormLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const res = await axios.post("/api/v1/user/login", { email, password });
      setToken(res.data.token);
    } catch (err) {
      console.log(err);
      const caughtError = catchErrors(err);
      setErrorMsg(caughtError);
    }

    setFormLoading(false);
  };

  return (
    <>
      <div className="form-wrap">
        <Form
          loading={formLoading}
          error={errorMsg !== null}
          onSubmit={handleSubmit}
          id="login"
        >
          <Message
            error
            header="Oops!"
            content={errorMsg}
            onDismiss={() => setErrorMsg(null)}
          />
          <Segment>
            <div className="login-title">
              <h1> Login </h1>
            </div>
            <Form.Input
              label="Email"
              required
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              icon="envelope"
              iconPosition="left"
              type="email"
            />
            <Form.Input
              label="Password"
              required
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              icon={{
                name: showPassword ? "eye slash" : "eye",
                circular: true,
                link: true,
                onClick: () => setShowPassword(!showPassword),
              }}
              iconPosition="left"
              type={showPassword ? "text" : "password"}
            />
            <Divider />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button id="login-btn" content="Log In" fluid />
            </div>
            <h5 className="form-link" onClick={() => setIsLogin(false)}>
              Need to make an account?
            </h5>
          </Segment>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
