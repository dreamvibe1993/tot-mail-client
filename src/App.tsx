import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";

import { MailClient } from "./components/MailClient/MailClient";

/**
 * TODO:
 * сортировка
 * прочитанные и нет
 */

function App() {
  const history = useHistory();

  return (
    <BrowserRouter>
      <ToastContainer autoClose={2500} closeOnClick/>
      <div className="App">
        <Switch>
          <Route exact={true} path={"/"}>
            <Link to={"/mailbox"}>Enter to mailbox</Link>
          </Route>
          <Route path={"/mailbox"}>
            <MailClient />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
