import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SignUpForm.css";
import { signup, clearSessionErrors } from "../../store/session";

export default function SignupForm() {
  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [password2, setPassword2] = useState("");
  // const errors = useSelector((state) => state.errors.session);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearSessionErrors());
  //   };
  // }, [dispatch]);

  // const update = (field) => {
  //   let setState;

  //   switch (field) {
  //     case "email":
  //       setState = setEmail;
  //       break;
  //     case "username":
  //       setState = setUsername;
  //       break;
  //     case "password":
  //       setState = setPassword;
  //       break;
  //     case "password2":
  //       setState = setPassword2;
  //       break;
  //     default:
  //       throw Error("Unknown field in Signup Form");
  //   }

  //   return (e) => setState(e.currentTarget.value);
  // };

  // const usernameSubmit = (e) => {
  //   e.preventDefault();
  //   const user = {
  //     email,
  //     username,
  //     password,
  //   };

  //   dispatch(signup(user));
  // };

  return (
    <>
      <div className="signup-grid">
        <div className="signup-form">
          <h1 className="signup-title">Sign Up</h1>
          <span className="signup-description">
            Create an account to start setting up your reminders now!
          </span>
          <form>
            {/* onSubmit={handleSubmit} */}
            <div className="input-wrapper">
              <div className="signup-input">
                <input
                  type="email"
                  // value={formValues.email}
                  name="email"
                  id="email"
                  placeholder="email"
                  // onChange={handleChange}
                  className="email"
                />
              </div>

              <div className="password-input">
                <input
                  type="password"
                  // value={formValues.password}
                  name="password"
                  id="password"
                  placeholder="password"
                  // onChange={handleChange}
                  className="password"
                />
              </div>

              <div className="phonenumber-input">
                <input
                  type="phonenumber"
                  // value={formValues.phone}
                  name="phonenumber"
                  id="phonenumber"
                  placeholder="phonenumber"
                  // onChange={handleChange}
                  className="phonenumber"
                />
              </div>
            </div>

            {/* {errors && <div className="error-login">{errors}</div>} */}
            <div className="buttons-wrapper">
              <button type="submit" className="signup-btn">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
