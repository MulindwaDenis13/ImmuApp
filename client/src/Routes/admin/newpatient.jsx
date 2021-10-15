import React, { Component } from "react";
import Nav from "./components/nav";
import Patients from "../../components/newpatient";

class Newpatient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="patients" />
        <Patients />
      </>
    );
  }
}

export default Newpatient;
