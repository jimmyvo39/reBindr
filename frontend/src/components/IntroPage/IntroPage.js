import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login, clearSessionErrors } from "../../store/session";
import "./IntroPage.css";

function IntroPage() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => !!state.session.user);
  const history = useHistory();
  const demoLogin = () => {
    dispatch(login({ email: "demo@user.io", password: "password" }));
    history.push("/home");
  };

  const introButtons = () => {
    if (loggedIn) {
      return (
        <div className="intro_button">
          <Link to={"/home"}>
            <button className="demo-btn" id="demo-user-button">
              Home
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="intro_button">
          <Link to={"/login"}>
            <button className="border-btn">Log in</button>
          </Link>
          <Link to={"/signup"}>
            <button className="border-btn">Sign up</button>
          </Link>

          <Link to={"/home"}>
            <button className="demo-btn" onClick={demoLogin}>
              Demo
            </button>
          </Link>
        </div>
      );
    }
  };

  return (
    <section className="intro_page">
      <div className="intro_wrapper">
        <section className="intro">
          <div className="intro_title">
            <h1>Create and plan out your own daily reminders.</h1>
            <p>
              Create, update, and set your reminders through text or email all
              in one app.
            </p>
            {introButtons()}
          </div>
          <img src="CalendarIMG1.png" alt=""></img>
        </section>
      </div>
    </section>
  );
}

export default IntroPage;
