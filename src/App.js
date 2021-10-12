import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import User from "./pages/User";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={User} />
        <Route path="/add-user" component={AddUser} />
        <Route path="/edit-user/:id" component={EditUser} />
      </Switch>
    </Router>
  );
}

export default App;
