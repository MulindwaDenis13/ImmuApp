import React, { Component } from "react";
import Admin from "./user_routes/admin";
import Doctor from "./user_routes/doctor";
import Login from "./components/login";
import user from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (user.user.doctor_role === "admin") {
      return <Admin />;
    } else if (user.user.doctor_role === "doctor") {
      return <Doctor />;
    } else {
      return <Login />;
    }
  }
}

export default App;
