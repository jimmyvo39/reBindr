import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignupForm/SignupForm";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"}>
          <NavBar />
          <LoginForm />
        </Route>
        <Route exact path={"/signup"}>
          <NavBar />
          <SignUpForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
