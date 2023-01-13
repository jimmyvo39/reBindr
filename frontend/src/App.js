import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import BigCalendar from "./components/Calendar";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignupForm/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./store/session";
import InventoryShow from "./components/InventoryShow/InventoryShow";
import AboutPage from "./components/About";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import IntroPage from "./components/IntroPage/IntroPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  const loggedIn = useSelector((state) => !!state.session.user);

  return (
    
    loaded && (
      <div className="App">
        <NavBar />

        <Switch>
          <AuthRoute exact path="/" component={IntroPage} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignUpForm} />
          <AuthRoute exact path="/about" component={AboutPage} />

          <ProtectedRoute exact path="/" component={IntroPage} />

          <ProtectedRoute exact path="/home" component={HomePage} />

          <ProtectedRoute
            exact
            path="/inventories/:id"
            component={InventoryShow}
          />

          <ProtectedRoute exact path="/about" component={AboutPage} />

          {/* <AuthRoute path="/about" component={AboutPage} /> */}
          {/* <ProtectedRoute exact path="/about" component={AboutPage} /> */}
          <Route path="/about" component={AboutPage}/>
          {/* <Route exact path={"/"}>
            {SessionLinks}
          </Route>
          <Route exact path={"/signup"}>
            <SignUpForm />
          </Route>
          <Route path={"/about"}>
            <AboutPage />
          </Route>

          <Route path={"/test"}>
            <>
              <h1>test page</h1>
            </>
          </Route>

          <Route path={"/inventories/:id"}>
            <>
              <InventoryShow />
            </>
          </Route> */}

        </Switch>
      </div>
    )
  );
}

export default App;
