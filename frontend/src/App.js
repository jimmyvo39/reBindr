import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import BigCalendar from "./components/Calendar";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignupForm/SignupForm";
import { useSelector } from "react-redux";

function App() {
  const sessionUser = useSelector((state) => state.session.user);

  let SessionLinks;
  if (sessionUser) {
    SessionLinks = (
      <>
        <h1>Home Page</h1>
      </>
    );
  } else {
    SessionLinks = <LoginForm />;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path={"/"}>
            {SessionLinks}
          </Route>
          <Route exact path={"/signup"}>
            <SignUpForm />
          </Route>

          <Route path={"/test"}>
            <>
              <h1>test page</h1>
              <BigCalendar />
            </>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
