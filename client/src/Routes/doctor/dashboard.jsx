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
import user from "../../config";

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
      vaccinate: false,
      message: "Please Wait",
      messageState: "",
      recepients: [],
      recepient_vaccinations: [],
      doctor_vaccination: [],
      vaccines: 0,
      recepient: 0,
    };
    this.fetchRecepients();
    this.fetchVaccinations();
  }

  async fetchRecepients() {
    const res =
      (await UsersApi.data(`/admin/recepients/${user.user.doctors_id}`)) || [];
    let recepient = 0;
    let today =
      new Date(Date.now()).getDate() +
      "-" +
      (new Date(Date.now()).getMonth() + 1) +
      "-" +
      new Date(Date.now()).getFullYear();
    res === "Error"
      ? this.setState({ ...this.state, recepient: 0 })
      : res.forEach((i) => {
          let recepient_date =
            new Date(parseInt(i.recepient_date)).getDate() +
            "-" +
            (new Date(parseInt(i.recepient_date)).getMonth() + 1) +
            "-" +
            new Date(parseInt(i.recepient_date)).getFullYear();
          if (today === recepient_date) {
            recepient++;
          }
        });
    this.setState({
      ...this.state,
      recepients: res === "Error" ? [] : res,
      recepient: recepient,
    });
  }

  async fetchVaccinations() {
    const res =
      (await UsersApi.data(
        `/admin/doctor-vaccinations/${user.user.doctors_id}`
      )) || [];
    let vaccines = 0;
    let today =
      new Date(Date.now()).getDate() +
      "-" +
      (new Date(Date.now()).getMonth() + 1) +
      "-" +
      new Date(Date.now()).getFullYear();
    res === "Error"
      ? this.setState({ ...this.state, vaccines: 0 })
      : res.forEach((i) => {
          let vaccine_date =
            new Date(parseInt(i.vaccine_date)).getDate() +
            "-" +
            (new Date(parseInt(i.vaccine_date)).getMonth() + 1) +
            "-" +
            new Date(parseInt(i.vaccine_date)).getFullYear();
          if (today === vaccine_date) {
            vaccines++;
          }
        });

    this.setState({
      ...this.state,
      doctor_vaccination: res === "Error" ? [] : res,
      vaccines: vaccines,
    });
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

  CloseVaccinate = () => {
    this.setState({ ...this.state, vaccinate: false });
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

  getNameSpaces(n, i) {
    let name = n.split(" ")[0];
    let name_formatted;
    if (name.length === i) {
      name_formatted = name + " ";
    }
    if (name.length > i) {
      name_formatted = name.substring(0, i) + " ";
    }
    if (name.length < i) {
      name_formatted = name;
      let spaces = i - name.length;
      for (let i = 0; i < spaces; i++) {
        name_formatted = name_formatted + " ";
      }
    }
    return name_formatted;
  }

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
                  <h3>{this.state.doctor_vaccination.length}</h3>
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
                  <h3>{this.state.vaccines}</h3>
                  <span>Vaccinations</span> <br />
                  <span style={{ fontSize: "13px" }}>Made Today</span>
                </div>
                <div className="">
                  <span className="las la-medkit"></span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h3>{this.state.recepients.length}</h3>
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
                  <h3>{this.state.recepient}</h3>
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
                    <Link to="/recepients">
                      <Button variant="contained" color="primary">
                        Search
                      </Button>
                    </Link>
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
                    </Menu>
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Date Of Birth</td>
                          <td>Birth Place</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.recepients.length === 0 ? (
                          <tr>
                            <td>You have Registered no Recepient </td>
                          </tr>
                        ) : this.state.recepients.length >= 5 ? (
                          this.state.recepients
                            .slice(
                              this.state.recepients.length - 5,
                              this.state.recepients.length
                            )
                            .map((v, i) => {
                              return (
                                <tr key={i}>
                                  <td className="name_cell">{v.sur_name}</td>
                                  <td>{v.date_of_birth}</td>
                                  <td>{v.birth_place}</td>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={async () => {
                                      let res = await UsersApi.data(
                                        `/admin/vaccinations/${v.recepient_id}`
                                      );
                                      this.setState({
                                        ...this.state,
                                        recepient_vaccinations:
                                          res === "Error" ? [] : res,
                                        vaccinate: true,
                                        data: v.recepient_id,
                                      });
                                    }}
                                  >
                                    Record
                                  </Button>
                                </tr>
                              );
                            })
                        ) : (
                          this.state.recepients.map((x, y) => {
                            return (
                              <tr key={y}>
                                <td className="name_cell">{x.sur_name}</td>
                                <td>{x.date_of_birth}</td>
                                <td>{x.birth_place}</td>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={async () => {
                                    let res = await UsersApi.data(
                                      `/admin/vaccinations/${x.recepient_id}`
                                    );
                                    this.setState({
                                      ...this.state,
                                      recepient_vaccinations:
                                        res === "Error" ? [] : res,
                                      vaccinate: true,
                                      data: x.recepient_id,
                                    });
                                  }}
                                >
                                  Record
                                </Button>
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
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Number</td>
                          <td>Name</td>
                          <td>Date of Birth</td>
                          <td>Vaccines</td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.doctor_vaccination.length === 0 ? (
                          <tr>
                            <td>No Vaccination Made</td>
                          </tr>
                        ) : this.state.doctor_vaccination.length >= 5 ? (
                          this.state.doctor_vaccination
                            .slice(
                              this.state.doctor_vaccination.length - 5,
                              this.state.doctor_vaccination.length
                            )
                            .map((v, i) => {
                              return (
                                <tr key={i}>
                                  <td>{v.recepient_number}</td>
                                  <td>{v.sur_name}</td>
                                  <td>{v.date_of_birth}</td>
                                  <td>
                                    <Button
                                      color="primary"
                                      variant="contained"
                                      onClick={async () => {
                                        let res = await UsersApi.data(
                                          `/admin/vaccinations/${v.recepient_id}`
                                        );
                                        this.setState({
                                          ...this.state,
                                          recepient_vaccinations:
                                            res === "Error" ? [] : res,
                                          vaccinate: true,
                                          data: v.recepient_id,
                                        });
                                      }}
                                    >
                                      See
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })
                        ) : (
                          this.state.doctor_vaccination.map((x, y) => {
                            return (
                              <tr key={y}>
                                <td>{x.recepient_number}</td>
                                <td>{x.sur_name}</td>
                                <td>{x.date_of_birth}</td>
                                <td>
                                  <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={async () => {
                                      let res = await UsersApi.data(
                                        `/admin/vaccinations/${x.recepient_id}`
                                      );
                                      this.setState({
                                        ...this.state,
                                        recepient_vaccinations:
                                          res === "Error" ? [] : res,
                                        vaccinate: true,
                                        data: x.recepient_id,
                                      });
                                    }}
                                  >
                                    See
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        <Dialog
          open={this.state.vaccinate}
          onClose={this.CloseVaccinate}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Vaccination</DialogTitle>

          <DialogContent>
            <DialogContentText>
              <h5>Past Immunisations</h5>
              <table>
                <thead>
                  <td>Hospital</td>
                  <td>Vaccines</td>
                  <td>Date</td>
                </thead>
                <tbody>
                  {this.state.recepient_vaccinations.length === 0
                    ? "No Vaccination for this recepient"
                    : this.state.recepient_vaccinations.map((v, i) => {
                        let vaccines = "";
                        let vac = JSON.parse(v.vaccines);
                        vac.forEach((v) => {
                          if (vac.length > 1) {
                            if (vac.indexOf(v) === vac.length - 1) {
                              vaccines =
                                vaccines +
                                `${this.getNameSpaces(v.vaccine_name, 10)}`;
                            } else {
                              vaccines =
                                vaccines +
                                `${this.getNameSpaces(v.vaccine_name, 10)}` +
                                ",";
                            }
                          } else {
                            vaccines =
                              vaccines +
                              `${this.getNameSpaces(v.vaccine_name, 10)}`;
                          }
                        });
                        return (
                          <tr key={i}>
                            <td>{v.doctor_hospital}</td>
                            <td>{vaccines}</td>
                            <td>
                              {new Date(parseInt(v.vaccine_date)).getDate() +
                                "-" +
                                (new Date(parseInt(v.vaccine_date)).getMonth() +
                                  1) +
                                "-" +
                                new Date(
                                  parseInt(v.vaccine_date)
                                ).getFullYear()}
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.CloseVaccinate} color="primary">
              Cancel
            </Button>
            <Link to={`/vaccination?recepient-id=${parseInt(this.state.data)}`}>
              <Button type="submit" color="primary">
                Continue
              </Button>
            </Link>
          </DialogActions>
        </Dialog>

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
              <Button color="primary">Continue</Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
  }
}

export default Dashboard;
