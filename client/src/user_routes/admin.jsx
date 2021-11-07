import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../App.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";

import Dashboard from "../Routes/admin/dashboard";
import Newdoctor from "../Routes/admin/newdoctor";
import Newpatient from "../Routes/admin/newpatient";
import Vaccines from "../Routes/admin/vaccines";
import Doctors from "../Routes/admin/doctors";
import Recepients from "../Routes/admin/recepients";
import Analytics from "../Routes/admin/chart";
import Vaccination from "../Routes/admin/vaccinate";
import Vaccinations from "../Routes/admin/vaccination";
import Error from "../components/404";

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
            <Route path="/vaccines" exact component={Vaccines} />
            <Route path="/doctors" exact component={Doctors} />
            <Route path="/recepients" exact component={Recepients} />
            <Route path="/analytics" exact component={Analytics} />
            <Route path="/vaccination" exact component={Vaccination} />
            <Route path="/vaccinations" exact component={Vaccinations} />
            <Route path="*" exact component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Admin;
