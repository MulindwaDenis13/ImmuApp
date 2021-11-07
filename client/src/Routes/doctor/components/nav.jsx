import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="sideBar-ctr">
          <div className="sidebar">
            <label htmlFor="nav-toggle" className="close-on-sm">
              <span className="las la-times"></span>
            </label>
            <div className="sidebar-brand">
              <h2>
                <span className="lab la-accusoft"></span>
                <span>Hospital</span>
              </h2>
            </div>
            <div className="sidebar-menu">
              <ul>
                <li>
                  <Link to="/">
                    <span
                      className={`${
                        this.props.active === "dashboard" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-home"></span>
                      <span>Home</span>
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/recepients">
                    <span
                      className={`${
                        this.props.active === "recepients" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-address-book"></span>
                      <span>Recepients</span>
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/vaccinations">
                    <span
                      className={`${
                        this.props.active === "vaccinations" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-medkit"></span>
                      <span>Vaccinations</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Nav;
