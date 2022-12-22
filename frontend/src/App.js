import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import BigCalendar from "./components/Calendar";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignupForm/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./store/session";
// import InventoryForm from "./components/InventoryCreateFormModal/InventoryCreateForm";
import InventoryShow from "./components/InventoryShow/InventoryShow";
import AboutPage from "./components/About";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  // debugger

  const sessionUser = useSelector((state) => !!state.session.user);

  let SessionLinks;
  if (sessionUser) {
    SessionLinks = (
      <>
        <HomePage />
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
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  );
}

export default App;
