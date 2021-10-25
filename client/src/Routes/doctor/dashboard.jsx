import React, { Component } from "react";
import {
  Snackbar,
  IconButton,
  TextField,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import UsersApi from "../../api/users";
import { Link } from "react-router-dom";
import Nav from "./components/nav";
import Header from "../../components/header";
import Footer from "../../components/footer";

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
      message: "Please Wait",
      messageState: "",
      recepients: [],
    };
    this.fetchRecepients();
  }

  async fetchRecepients() {
    const res = (await UsersApi.data("/admin/recepients")) || [];
    this.setState({ ...this.state, recepients: res === "Error" ? [] : res });
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

  handleClose = () => {
    this.setState({ ...this.state, dialog: false });
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

  handleVaccine = async (e) => {
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
    let res = await api.post("/admin/new-vaccine", _fcontent);
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
        <Nav active="dashboard" />
        <div className="main-content">
          <Header />
          <main>
            <div className="cards">
              <div className="card-single">
                <div className="">
                  <h3>20</h3>
                  <span>Vaccinations</span>
                  <br />
                  <span style={{ fontSize: "13px" }}>Made</span>
                </div>
                <div className="">
                  <span className="las la-medkit"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h3>12</h3>
                  <span>Vaccinations</span> <br />
                  <span style={{ fontSize: "13px" }}>Made Today</span>
                </div>
                <div className="">
                  <span className="las la-medkit"></span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h3>35</h3>
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
                      <Link to="/new-patient">
                        <MenuItem onClick={this.handleCloseActionsDrugs}>
                          New Recepient
                        </MenuItem>
                      </Link>
                      <MenuItem onClick={this.handleCloseActionsDrugs}>
                        See All
                      </MenuItem>
                    </Menu>
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Age</td>
                          <td>Birth Place</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.recepients.length === 0 ? (
                          <tr>
                            <td>No Recepient Registered</td>
                          </tr>
                        ) : (
                          this.state.recepients.slice(0, 4).map((v, i) => {
                            return (
                              <tr key={i}>
                                <td className="name_cell">{v.sur_name}</td>
                                <td>{v.child_age}</td>
                                <td>{v.birth_place}</td>
                                <Link
                                  to={`/vaccination?recepient-id=${v.patient_id}`}
                                >
                                  <Button variant="contained" color="primary">
                                    Vaccinate
                                  </Button>
                                </Link>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
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
                    </Menu>
                  </div>
                  <div className="card-body"></div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        <Dialog
          open={this.state.dialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Vaccine</DialogTitle>
          <form autoComplete="off" onSubmit={this.handleVaccine}>
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
                  name="sight_of_vaccine"
                  variant="standard"
                  label="Sight of Vaccination"
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
      </>
    );
  }
}

export default Dashboard;
