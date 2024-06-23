import { Route, Router, Switch } from "wouter";

import Bin from "views/bin";
import DefaultRoute from "views/default-route";

import Header from "components/header/header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/:binId" component={Bin}></Route>
        <Route component={DefaultRoute}></Route>
      </Switch>
    </Router>
  );
}

export default App;
