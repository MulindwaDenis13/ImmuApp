import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../App.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";

import Dashboard from "../Routes/doctor/dashboard";
import Newpatient from "../Routes/doctor/newpatient";
import Vaccination from "../Routes/doctor/vaccinate";
import Error from "../components/404";

class Doctor extends Component {
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
            <Route path="/new-patient" exact component={Newpatient} />
            <Route path="/vaccination" exact component={Vaccination} />
            <Route path="*" exact component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Doctor;
