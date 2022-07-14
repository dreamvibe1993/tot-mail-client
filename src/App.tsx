import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import "./App.css";

import { MailClient } from "./components/MailClient/MailClient";

/**
 * TODO: 
 * уведомления
 * сортировка
 * ограничение по наименованию в кастом табах
 * прочитанные и нет
 */

function App() {
  const history = useHistory();

  return (
    <BrowserRouter>
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
