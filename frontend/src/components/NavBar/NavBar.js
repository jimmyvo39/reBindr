import { Link } from "react-router-dom";
// import Logo from "../../../public/assets/images/logo.png";
import "./NavBar.css";

export default function NavBar() {
  return (
    <>
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
        {/* <nav className="navigations">
          <a className="logo" href="/">
            <img src="../logo.png" alt="logo" />
          </a>
          <a className="login-link" href="/">
            <h1>Log In</h1>
          </a>
          <a className="signup-link" href="/">
            <h1>Sign Up</h1>
          </a>
          <a className="about-link" href="/">
            <h1>About</h1>
          </a>
        </nav> */}
      </div>
    </>
  );
}
