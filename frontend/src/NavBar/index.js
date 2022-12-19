import { Link } from "react-router-dom";
import "./index.css";

export default function NavBar() {
  return (
    <>
      <div className="nav-bar">
        <nav className="navigations">
          <a href="/">
            <img src="../assets/images/logo.png" alt="logo" />
          </a>
          <a href="/">
            <h1>Log In</h1>
          </a>
          <a href="/">
            <h1>Sign Up</h1>
          </a>
          <a href="/">
            <h1>About</h1>
          </a>
        </nav>
      </div>
    </>
  );
}
