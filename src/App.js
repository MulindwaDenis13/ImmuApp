import React, { Component } from "react";
import Admin from "./user_routes/admin";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Admin />;
  }
}

export default App;
