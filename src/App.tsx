import { Route, Router } from "wouter";

import Bin from "views/bin";
import Header from "components/header/header";

function App() {
  return (
    <Router>
      <Header />
      <Route component={Bin}></Route>
    </Router>
  );
}

export default App;
