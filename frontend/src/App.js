import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <Switch>
        <Route exact path={"/"}>
        </Route>
      </Switch> */}
    </div>
  );
}

export default App;
