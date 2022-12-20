import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import BigCalendar from "./components/Calendar";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignupForm/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./store/session";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  // debugger

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
    loaded && (
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
    )
  );
}

export default App;
