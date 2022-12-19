// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login } from "../../store/session";
import "./LoginForm.css";

export default function LoginForm() {
  // { onSuccess }
  // const dispatch = useDispatch();

  // const [formValues, setFormValues] = useState({
  //   email: "",
  //   password: "",
  // });

  // const [errors, setErrors] = useState(null);
  // const handleChange = (e) => {
  //   setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const user = {
  //     email: formValues.email,
  //     password: formValues.password,
  //   };

  //   setErrors(null);
  //   dispatch(login(user))
  //     .then((res) => {
  //       if (res.ok) {
  //         onSuccess();
  //       }
  //     })
  //     .catch(async (res) => {
  //       // const errors = await res.json();
  //       setErrors("Invalid email or password.");
  //     });
  // };
  // const handleDemoUser = () => {
  //   setErrors("");
  //   const user = {
  //     email: "jimmy@vo.com",
  //     password: "password",
  //   };
  //   dispatch(login(user))
  //     .then((res) => {
  //       if (res.ok) {
  //         onSuccess();
  //       }
  //     })
  //     .catch(async (res) => {
  //       const errors = await res.json();
  //       setErrors(errors);
  //     });
  // };

  return (
    <>
      <div className="login-grid">
        <div className="login-form">
          <h1 className="login-title">Log In</h1>
          <span className="login-description">
            Already have an account? Get in to set your reminders now!
          </span>
          <form>
            {/* onSubmit={handleSubmit} */}
            <div className="input-wrapper">
              <div className="login-input">
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
              <button type="submit" className="login-btn">
                Sign in
              </button>

              <button
                // onClick={handleDemoUser}
                className="demo-user-btn"
                type="button"
              >
                Demo User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
