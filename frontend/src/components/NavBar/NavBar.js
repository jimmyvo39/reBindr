import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
// import Logo from "../../../public/assets/images/logo.png";
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

  if (loggedIn) {
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
              <Link to="#">About</Link>
            </li>
            <li>
              <button onClick={logoutUser}>Logout</button>
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
              <Link to="/">Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="#">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
