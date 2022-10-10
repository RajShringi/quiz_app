import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Question from "./Question";

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            path="/question/:categoryId/:difficulty"
            component={Question}
          />
          {/* <Route path="/result">
            <Result result={result} score={score} />
          </Route> */}
        </Switch>
      </>
    );
  }
}
export default App;
