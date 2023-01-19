import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SignUpForm.css";
import { signup, clearSessionErrors } from "../../store/session";
import { Redirect, useHistory } from "react-router-dom";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();
  const createdUser = useSelector((state) => !!state.session.user);

  const [usernameBlank, setUsernameBlank] = useState(false)
  const [emailBlank, setEmailBlank] = useState(false)
  const [passwordBlank, setPasswordBlank] = useState(false)
  const [phoneBlank, setPhoneBlank] = useState(false)

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "phone":
        setState = setPhone;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }
    return (e) => setState(e.currentTarget.value);
  };

  const userSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      phone,
    };
    
    let blankErrors = false
    for (let field in user) {
      if (!user[field]) {
        switch (field) {
          case 'username':
            setUsernameBlank(true)
            blankErrors = true
            break
          case 'email':
            setEmailBlank(true)
            blankErrors = true
            break
          case 'password':
            setPasswordBlank(true)
            blankErrors = true
            break
          case 'phone':
            setPhoneBlank(true)
            blankErrors = true
            break
          default:
            break
        }
      }
    }
  
    // if (blankErrors) return    
    dispatch(signup(user));
    // history.push("/home");
  };

  if (createdUser) return <Redirect to="/home" />;

  return (
    <>
      <div className="signup-grid">
        <div className="signup-form">
          <h1 className="signup-title">Sign Up</h1>
          <span className="signup-description">
            Create an account to start setting up your reminders now!
          </span>
          <form onSubmit={userSubmit}>
            <div className="input-wrapper">
              <div className="username-input">
                <input
                  type="username"
                  value={username}
                  name="username"
                  id="username"
                  placeholder="username"
                  onChange={update("username")}
                  className="username"
                />
              </div>
              <div className="errors">{errors?.username}</div>
              {usernameBlank &&  <div className="errors">username can't be blank</div>}

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
              <div className="errors">{errors?.email}</div>
              {emailBlank && <div className="errors">email can't be blank</div>}

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
              <div className="errors">{errors?.password}</div>
              {passwordBlank && <div className="errors">password can't be blank</div>}

              <div className="phone-input">
                <input
                  type="tel"
                  value={phone}
                  name="phone"
                  id="phone"
                  placeholder="phone"
                  onChange={update("phone")}
                  className="phone"
                />
              </div>
              <div className="errors">{errors?.phone}</div>
              {phoneBlank && <div className="errors">phone can't be blank</div>}
            </div>

            <div className="buttons-wrapper">
              <input
                type="submit"
                value="Sign Up"
                className="signup-btn"
                // disabled={!email || !username || !password || !phone}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
