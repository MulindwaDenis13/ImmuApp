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
import Nav from "./components/nav";
import Header from "../../components/header";
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
    };
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
                  onSubmit={this.handleSubmit}
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
                                <MenuItem value="cashier">Cashier</MenuItem>
                                <MenuItem value="dispenser">Dispenser</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
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
        </div>
      </>
    );
  }
}

export default Newdoctor;
