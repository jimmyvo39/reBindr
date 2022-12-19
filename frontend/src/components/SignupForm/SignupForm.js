import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../store/session";
import "./SignUpForm.css";

export default function SignUpForm() {
  return (
    <>
      <div className="signup-grid">
        <div className="signup-form">
          <h1 className="signup-title">Sign Up</h1>
          <span className="signup-description">
            Create an account to enjoy all the services without any ads for
            free!
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
