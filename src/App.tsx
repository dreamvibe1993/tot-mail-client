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
 * кнопку назад из письма
 * имя даже если нет почты
 * перемещение в недоступные для этого папки
 * сортировка
 * при копировании с письмами давать уник. айди
 * ограничение по наименованию в кастом табах
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
