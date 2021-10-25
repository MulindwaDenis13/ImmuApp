import React, { Component } from "react";
import {
  TextField,
  Snackbar,
  Button,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import UsersApi from "../../api/users";
import Nav from "./components/nav";
import Header from "../../components/header";
import Footer from "../../components/footer";
import MuiAlert from "@material-ui/lab/Alert";
import "../../design/forms.css";
import "../../design/main.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Newdoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "Please Wait....",
      messageState: "",
      hospitals: [],
    };
    this.fetchHospitals();
  }

  async fetchHospitals() {
    const res = (await UsersApi.data("/admin/hospitals")) || [];
    this.setState({ ...this.state, hospitals: res === "Error" ? [] : res });
  }

  closePopUp = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      ...this.state,
      open: false,
      message: "Please Wait...",
      messageState: "info",
    });
  };

  handleDoctor = async (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      open: true,
      messageState: "info",
      message: "Please Wait...",
    });
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    const api = new UsersApi();
    let res = await api.post("/admin/new-doctor", _fcontent);
    if (res !== "Error") {
      if (res.status === true) {
        this.setState({
          ...this.state,
          message: res.data,
          messageState: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        this.setState({
          ...this.state,
          message: res.data,
          messageState: "error",
        });
      }
    }
  };

  render() {
    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.closePopUp}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.closePopUp}
              >
                <i className="las la-times"></i>
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert onClose={this.closePopUp} severity={this.state.messageState}>
            {this.state.message}
          </Alert>
        </Snackbar>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="users" />
        <div className="main-content">
          <Header />
          <main>
            <div className="fullwidth-ctr">
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
                  onSubmit={this.handleDoctor}
                >
                  <div
                    className=""
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "1rem",
                    }}
                  >
                    <div className="form-header-ctr">
                      <div className="">
                        <h3>New Doctor</h3>
                      </div>
                      <div className="">
                        <Button
                          aria-describedby={this.id}
                          variant="contained"
                          color="primary"
                          style={{ marginInline: 10 }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          aria-describedby={this.id}
                          variant="contained"
                          color="primary"
                          style={{ marginInline: 10 }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="inputCtr">
                        <h4>Doctor Details</h4>
                        <div className="inputs_ctr">
                          <div className="inpts_on_left">
                            <TextField
                              name="surname"
                              variant="outlined"
                              label="Surname"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                            <TextField
                              name="first_name"
                              variant="outlined"
                              label="First Name"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                            <TextField
                              name="username"
                              variant="outlined"
                              label="Username"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                          </div>
                          <div className="inpts_center">
                            <TextField
                              name="phone_contact"
                              variant="outlined"
                              label="Phone Contact"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                            <FormControl
                              variant="outlined"
                              label="Role"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            >
                              <InputLabel id="role">Hospital</InputLabel>
                              <Select
                                inputProps={{ name: "hospital" }}
                                id="select_hospital"
                                label="Hospital"
                                defaultValue=""
                              >
                                {this.state.hospitals.length === 0
                                  ? ""
                                  : this.state.hospitals.map((v, i) => {
                                      return (
                                        <MenuItem
                                          value={v.hospital_name}
                                          key={i}
                                        >
                                          {v.hospital_name}
                                        </MenuItem>
                                      );
                                    })}
                              </Select>
                            </FormControl>

                            <FormControl
                              variant="outlined"
                              label="Gender"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            >
                              <InputLabel id="gender">Gender</InputLabel>
                              <Select
                                inputProps={{ name: "gender" }}
                                id="select_gender"
                                label="Gender"
                                defaultValue="Male"
                              >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="inpts_on_right">
                            <TextField
                              type="password"
                              name="password"
                              variant="outlined"
                              label="Password"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                            <TextField
                              type="password"
                              name="confirm_password"
                              variant="outlined"
                              label="Confirm Password"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }
}

export default Newdoctor;
