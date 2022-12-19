import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"}>
          <NavBar />
          <LoginForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
