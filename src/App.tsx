import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { Home } from "./components/Home/Home";

import { MailClient } from "./components/MailClient/MailClient";

/**
 * TODO:
 * 404
 */

function App() {
  const history = useHistory();

  return (
    <BrowserRouter>
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
            <h1>404!</h1>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
