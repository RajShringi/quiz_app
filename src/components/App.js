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
          <Route path="/" exact>
            <Home />
          </Route>
          <Route
            path="/question/:categoryId/:difficulty"
            component={Question}
          />
        </Switch>
      </>
    );
  }
}
export default App;
