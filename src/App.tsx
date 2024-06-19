import { Route, Router } from "wouter";

import Header from "components/header/header";

function App() {
  return (
    <Router>
      <Header />
      <Route></Route>
    </Router>
  );
}

export default App;
