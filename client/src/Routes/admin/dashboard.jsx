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
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import Nav from "./components/nav";
import Header from "../../components/header";
import Footer from "../../components/footer";
import MuiAlert from "@material-ui/lab/Alert";
import UsersApi from "../../api/users";
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
      AnchorElAddress: null,
      dialog: false,
      district: false,
      subcounty: false,
      village: false,
      hospital_dialog: false,
      open: false,
      message: "Please Wait....",
      messageState: "",
      hospitals: [],
      vaccines: [],
      recepients: [],
      doctors: [],
      districts: [],
      subcounties: [],
    };
    this.fetchHospitals();
    this.fetchVaccines();
    this.fetchRecepients();
    this.fetchDoctors();
    this.fetchDistricts();
  }

  async fetchHospitals() {
    const res = (await UsersApi.data("/admin/hospitals")) || [];
    this.setState({ ...this.state, hospitals: res === "Error" ? [] : res });
  }

  async fetchDistricts() {
    const res = (await UsersApi.data("/admin/districts")) || [];
    this.setState({ ...this.state, districts: res === "Error" ? [] : res });
  }

  fetchSub = async (e) => {
    const res =
      (await UsersApi.data(`/admin/subcounty/${e.target.value}`)) || [];
    this.setState({ ...this.state, subcounties: res === "Error" ? [] : res });
  };

  async fetchVaccines() {
    const res = (await UsersApi.data("/admin/vaccines")) || [];
    this.setState({ ...this.state, vaccines: res === "Error" ? [] : res });
  }

  async fetchDoctors() {
    const res = (await UsersApi.data("/admin/doctors")) || [];
    this.setState({ ...this.state, doctors: res === "Error" ? [] : res });
  }

  async fetchRecepients() {
    const res = (await UsersApi.data("/admin/recepients")) || [];
    this.setState({ ...this.state, recepients: res === "Error" ? [] : res });
  }

  handleClose = () => {
    this.setState({ ...this.state, dialog: false });
  };

  CloseDistrict = () => {
    this.setState({ ...this.state, district: false });
  };

  CloseSubcounty = () => {
    this.setState({ ...this.state, subcounty: false });
  };

  CloseVillage = () => {
    this.setState({ ...this.state, village: false });
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
  handleOpenAction = (e) => {
    this.setState({ ...this.state, AnchorElAddress: e.currentTarget });
  };
  handleCloseAction = () => {
    this.setState({ ...this.state, AnchorElAddress: null });
  };

  handleVillage = async (e) => {
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
    let res = await api.post("/admin/new-village", _fcontent);
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

  handleSubcounty = async (e) => {
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
    let res = await api.post("/admin/new-subcounty", _fcontent);
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

  handleDistrict = async (e) => {
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
    let res = await api.post("/admin/new-district", _fcontent);
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

  handleHospital = async (e) => {
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
    let res = await api.post("/admin/new-hospital", _fcontent);
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
                  <h3>{this.state.hospitals.length}</h3>
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
                  <h3>{this.state.vaccines.length}</h3>
                  <span>Vaccines</span>
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
                  <h3>{this.state.doctors.length}</h3>
                  <span>Doctors</span>
                  <br />
                  <span style={{ fontSize: "13px" }}>Registered</span>
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
            <div className="recent-grid">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Addresses</h3>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-controls="drug-actions"
                      aria-haspopup="true"
                      onClick={this.handleOpenAction}
                    >
                      Menu
                      <span style={{ fontSize: "17.5px", marginLeft: "10px" }}>
                        <span className="las la-angle-down"></span>
                      </span>
                    </Button>
                    <Menu
                      id="address"
                      anchorEl={this.state.AnchorElAddress}
                      keepMounted
                      open={Boolean(this.state.AnchorElAddress)}
                      onClose={this.handleCloseAction}
                      disableScrollLock={true}
                    >
                      <MenuItem
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            AnchorElAddress: null,
                            district: true,
                          });
                        }}
                      >
                        New District
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            AnchorElAddress: null,
                            subcounty: true,
                          });
                        }}
                      >
                        New SubCounty
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            AnchorElAddress: null,
                            village: true,
                          });
                        }}
                      >
                        New Village
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

        <Dialog
          open={this.state.hospital_dialog}
          onClose={this.closeHandler}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Hospital</DialogTitle>
          <form autoComplete="off" onSubmit={this.handleHospital}>
            <DialogContent>
              <DialogContentText>
                <TextField
                  name="hospital_name"
                  variant="standard"
                  label="Hospital Name"
                  style={{
                    width: "85%",
                    margin: "20px",
                  }}
                />
                <TextField
                  name="hospital_location"
                  variant="standard"
                  label="Hospital Location"
                  style={{
                    width: "85%",
                    margin: "20px",
                  }}
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

        <Dialog
          open={this.state.district}
          onClose={this.CloseDistrict}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add District</DialogTitle>
          <form autoComplete="off" onSubmit={this.handleDistrict}>
            <DialogContent>
              <DialogContentText>
                <TextField
                  name="district_name"
                  variant="standard"
                  label="District Name"
                  style={{
                    width: "85%",
                    margin: "20px",
                  }}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.CloseDistrict} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog
          open={this.state.subcounty}
          onClose={this.CloseSubcounty}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add SubCounty</DialogTitle>
          <form autoComplete="off" onSubmit={this.handleSubcounty}>
            <DialogContent>
              <DialogContentText>
                <FormControl
                  variant="standard"
                  style={{
                    width: "75%",
                    margin: "20px",
                  }}
                >
                  <InputLabel id="district">District</InputLabel>
                  <Select
                    inputProps={{ name: "district" }}
                    labelId="district"
                    id="select_district"
                    label="district"
                    defaultValue=""
                  >
                    {this.state.districts.length === 0
                      ? ""
                      : this.state.districts.map((v, i) => {
                          return (
                            <MenuItem value={v.district_name} key={i}>
                              {v.district_name}
                            </MenuItem>
                          );
                        })}
                  </Select>
                </FormControl>
                <TextField
                  name="sub_name"
                  variant="standard"
                  label="Subcounty"
                  style={{
                    width: "85%",
                    margin: "20px",
                  }}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.CloseSubcounty} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog
          open={this.state.village}
          onClose={this.CloseVillage}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Village</DialogTitle>
          <form autoComplete="off" onSubmit={this.handleVillage}>
            <DialogContent>
              <DialogContentText>
                <FormControl
                  variant="standard"
                  style={{
                    width: "75%",
                    margin: "20px",
                  }}
                >
                  <InputLabel id="district">District</InputLabel>
                  <Select
                    inputProps={{ name: "district" }}
                    labelId="district"
                    id="select_district"
                    label="district"
                    defaultValue=""
                    onChange={this.fetchSub}
                  >
                    {this.state.districts.length === 0
                      ? ""
                      : this.state.districts.map((v, i) => {
                          return (
                            <MenuItem value={v.district_name} key={i}>
                              {v.district_name}
                            </MenuItem>
                          );
                        })}
                  </Select>
                </FormControl>
                <FormControl
                  variant="standard"
                  style={{
                    width: "75%",
                    margin: "20px",
                  }}
                >
                  <InputLabel id="subcounty">Subcounty</InputLabel>
                  <Select
                    inputProps={{ name: "sub_county" }}
                    labelId="subcounty"
                    id="select_sub"
                    label="subcounty"
                    defaultValue=""
                  >
                    {this.state.subcounties.length === 0
                      ? ""
                      : this.state.subcounties.map((v, i) => {
                          return (
                            <MenuItem value={v.sub_county_name} key={i}>
                              {v.sub_county_name}
                            </MenuItem>
                          );
                        })}
                  </Select>
                </FormControl>
                <TextField
                  name="village_name"
                  variant="standard"
                  label="Village"
                  style={{
                    width: "85%",
                    margin: "20px",
                  }}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.CloseSubcounty} color="primary">
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
