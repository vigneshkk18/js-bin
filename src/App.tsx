import { Route, Router, Switch } from "wouter";

import Bin from "views/bin";
import DefaultRoute from "views/default-route";

import Header from "components/header/header";
import WithSideMenu from "components/side-menu/with-side-menu";

import useSideMenu, { hideSideMenu } from "hooks/useSideMenu";

function App() {
  const show = useSideMenu();

  return (
    <WithSideMenu>
      <div className="h-full w-full relative">
        <div
          onClick={hideSideMenu}
          className={`z-40 absolute top-0 left-0 w-screen h-screen bg-black/20 ${
            show ? "" : "hidden"
          }`}
        ></div>
        <Router>
          <Header />
          <Switch>
            <Route path="/:binId" component={Bin}></Route>
            <Route component={DefaultRoute}></Route>
          </Switch>
        </Router>
      </div>
    </WithSideMenu>
  );
}

export default App;
