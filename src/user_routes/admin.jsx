import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../App.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";

import Dashboard from "../Routes/admin/dashboard";
import Newdoctor from "../Routes/admin/newdoctor";
import Newpatient from "../Routes/admin/newpatient";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/new-doctor" exact component={Newdoctor} />
            <Route path="/new-patient" exact component={Newpatient} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Admin;
