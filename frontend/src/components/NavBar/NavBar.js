import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getCurrentUser, logout } from "../../store/session";
import "./NavBar.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => !!state.session.user);
  const history = useHistory();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };
  console.log("For your curiosity, here are some easter eggs")

  if (loggedIn) {
    return (
      <div className="nav-bar">
        <nav>
          <ul>
            <li>
              <Link to="/home" className="logo">
                <img src="../logo.png" alt="logo" />
              </Link>
            </li>

            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={logoutUser}>
                Logout
              </button>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="nav-bar">
        <nav>
          <ul>
            <li>
              <Link to="/" className="logo">
                <img src="../logo.png" alt="logo" />
              </Link>
            </li>
            <li>
              <Link to="login">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
