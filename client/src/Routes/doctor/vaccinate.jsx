import React, { Component } from "react";
import Nav from "./components/nav";
import Vaccination from "../../components/newvaccination";

class Vaccinate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="patients" />
        <Vaccination />
      </>
    );
  }
}

export default Vaccinate;
