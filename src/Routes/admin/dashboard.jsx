import React, { Component } from "react";
import {
  TextField,
  Snackbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Nav from "./components/nav";
import Header from "../../components/header";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AnchorEl: null,
      AnchorElDrugs: null,
      dialog: false,
      hospital_dialog: false,
      open: false,
      message: "Please Wait....",
      messageState: "",
    };
  }

  handleClose = () => {
    this.setState({ ...this.state, dialog: false });
  };

  closeHandler = () => {
    this.setState({ ...this.state, hospital_dialog: false });
  };

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

  handleOpenActions = (e) => {
    this.setState({ ...this.state, AnchorEl: e.currentTarget });
  };
  handleOpenActionsDrugs = (e) => {
    this.setState({ ...this.state, AnchorElDrugs: e.currentTarget });
  };
  handleCloseActions = () => {
    this.setState({ ...this.state, AnchorEl: null });
  };
  handleCloseActionsDrugs = () => {
    this.setState({ ...this.state, AnchorElDrugs: null });
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
        <Nav active="dashboard" />
        <div className="main-content">
          <Header />
          <main>
            <div className="cards">
              <div className="card-single">
                <div className="">
                  <h3>20</h3>
                  <span>
                    Hospitals <br />
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h3>30</h3>
                  <span>Vaccines</span>
                </div>
                <div className="">
                  <span className="las la-users"></span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h3>45</h3>
                  <span>Recepients</span>
                  <br />
                  <span style={{ fontSize: "13px" }}>Registered</span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h3>10</h3>
                  <span>Recepients</span>
                  <br />
                  <span style={{ fontSize: "13px" }}>Registered Today</span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
            </div>
            <div className="recent-grid">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Recent Recepients</h3>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-controls="drug-actions"
                      aria-haspopup="true"
                      onClick={this.handleOpenActionsDrugs}
                    >
                      Menu
                      <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
                        <span className="las la-angle-down"></span>
                      </span>
                    </Button>
                    <Menu
                      id="recepient-actions"
                      anchorEl={this.state.AnchorElDrugs}
                      keepMounted
                      open={Boolean(this.state.AnchorElDrugs)}
                      onClose={this.handleCloseActionsDrugs}
                      disableScrollLock={true}
                    >
                      <MenuItem onClick={this.handleCloseActionsDrugs}>
                        New Recepient
                      </MenuItem>
                      <MenuItem onClick={this.handleCloseActionsDrugs}>
                        See All
                      </MenuItem>
                    </Menu>
                  </div>
                  <div className="card-body"></div>
                </div>
              </div>
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Recent Vaccinations</h3>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-controls="drug-actions"
                      aria-haspopup="true"
                      onClick={this.handleOpenActions}
                    >
                      Other Menu
                      <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
                        <span className="las la-angle-down"></span>
                      </span>
                    </Button>
                    <Menu
                      id="reception-actions"
                      anchorEl={this.state.AnchorEl}
                      keepMounted
                      open={Boolean(this.state.AnchorEl)}
                      onClose={this.handleCloseActions}
                      disableScrollLock={true}
                    >
                      <MenuItem
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            AnchorEl: null,
                            dialog: true,
                          });
                        }}
                      >
                        New Vaccine
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            AnchorEl: null,
                            hospital_dialog: true,
                          });
                        }}
                      >
                        New Hospital
                      </MenuItem>
                      <Link to="/new-doctor">
                        <MenuItem>New Doctor</MenuItem>
                      </Link>
                    </Menu>
                  </div>
                  <div className="card-body"></div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <Dialog
          open={this.state.dialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Vaccine</DialogTitle>
          <form autoComplete="off">
            <DialogContent>
              <DialogContentText>
                <TextField
                  name="vaccine_name"
                  variant="standard"
                  label="Vaccine Name"
                  style={{
                    width: "85%",
                    margin: "20px",
                  }}
                />
                <TextField
                  name="disease"
                  variant="standard"
                  label="Disease Prevented"
                  style={{
                    width: "85%",
                    margin: "20px",
                  }}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog
          open={this.state.hospital_dialog}
          onClose={this.closeHandler}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Hospital</DialogTitle>
          <form autoComplete="off">
            <DialogContent>
              <DialogContentText>
                <TextField
                  name="hospital_name"
                  variant="standard"
                  label="Hospital Name"
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeHandler} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
  }
}

export default Dashboard;
