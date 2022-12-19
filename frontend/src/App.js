import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import BigCalendar from "./components/Calendar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>

          <Route exact path={"/"}>
            <h1>Home page</h1>
          </Route>

          <Route path={"/test"}>
            <>
              <h1>test page</h1>
              <BigCalendar/>
            </>
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
