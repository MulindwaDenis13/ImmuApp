import React, { Component } from "react";
import Nav from "./components/nav";
import Recepients from "../../components/recepients";

class Recepient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="recepients" />
        <Recepients />
      </>
    );
  }
}

export default Recepient;
