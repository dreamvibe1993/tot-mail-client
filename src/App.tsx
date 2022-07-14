import React from "react";
import {
  BrowserRouter,
  HashRouter,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { NotFoundPage } from "./components/404/404";
import { Home } from "./components/Home/Home";

import { MailClient } from "./components/MailClient/MailClient";

/**
 * TODO:
 */

function App() {

  return (
    <HashRouter >
      <ToastContainer autoClose={2500} closeOnClick />
      <div className="App">
        <Switch>
          <Route exact={true} path={"/"}>
            <Home />
          </Route>
          <Route path={"/mailbox"}>
            <MailClient />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
