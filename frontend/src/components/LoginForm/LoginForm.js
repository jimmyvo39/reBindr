import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./LoginForm.css";

import { login, clearSessionErrors } from "../../store/session";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      <div className="login-grid">
        <div className="login-form">
          <h1 className="login-title">Log In</h1>
          <span className="login-description">
            Already have an account? Get in to set your reminders now!
          </span>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <div className="errors">{errors?.email}</div>
              <div className="login-input">
                <input
                  type="email"
                  value={email}
                  name="email"
                  id="email"
                  placeholder="email"
                  onChange={update("email")}
                  className="email"
                />
              </div>

              <div className="errors">{errors?.password}</div>

              <div className="password-input">
                <input
                  type="password"
                  value={password}
                  name="password"
                  id="password"
                  placeholder="password"
                  onChange={update("password")}
                  className="password"
                />
              </div>
            </div>

            {errors && <div className="error-login">{errors}</div>}
            <div className="buttons-wrapper">
              <input
                type="submit"
                className="login-btn"
                value="Log in"
                disabled={!email || !password}
              />

              <input
                type="submit"
                className="demo-user-btn"
                value="Demo User"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
