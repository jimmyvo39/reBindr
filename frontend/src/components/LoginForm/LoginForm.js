import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./LoginForm.css";

import { login, clearSessionErrors } from "../../store/session";
import DemoUser from "./DemoUser";
import { Redirect, useHistory } from "react-router-dom";
// import { Redirect } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const errors = useSelector((state) => state.errors.session);
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const errorMessage = 'Invalid Credentials'



  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((state) => !!state.session.user);
  

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
    if (!email || !password || errors) return setShowErrorMessage(true)
    dispatch(login({ email, password }));

    // history.push("/home");
  };

  if (loggedIn) return <Redirect to="/home" />;

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
              <div className="email-input">
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
              <br></br>
              {/* <div className="errors">{errors?.email}</div> */}

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
              <div></div>
              {/* <div className="errors">{errors?.password}</div> */}
            </div>
            {showErrorMessage ? <div className="errors">{errorMessage}</div> : <><br></br><br></br></>}
            <div className="buttons-wrapper">
              <input
                type="submit"
                className="login-btn"
                value="Log in"
                // disabled={!email || !password}
              />

              <DemoUser />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
