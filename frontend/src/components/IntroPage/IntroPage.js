import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login, clearSessionErrors } from "../../store/session";
import "./IntroPage.css";

function IntroPage() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => !!state.session.user);
  const demoLogin = () => {
    dispatch(login({ email: "demo@user.io", password: "password" }));
  };

  const introButtons = () => {
    if (loggedIn) {
      return (
        <div className="hero_button flex-row justify-start">
          <Link to={"/home"}>
            <button
              onClick={demoLogin}
              className="demo-btn"
              id="demo-user-button"
            >
              DEMO
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="hero_button flex-row justify-start">
          <Link to={"/login"}>
            <button className="border-btn">Log in</button>
          </Link>
          <Link to={"/signup"}>
            <button className="border-btn">Sign up</button>
          </Link>

          <Link to={"/home"}>
            <button className="demo-btn" onClick={demoLogin}>
              DEMO
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
            <h1>Create and organize your own own daily reminder events.</h1>
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
