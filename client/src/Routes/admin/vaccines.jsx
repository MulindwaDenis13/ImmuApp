import React, { Component } from "react";
import UsersApi from "../../api/users";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Nav from "./components/nav";
import Header from "../../components/header";
import Footer from "../../components/footer";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Vaccines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "Please Wait....",
      messageState: "",
      edit_dialog: false,
      delete: false,
      vaccines: [],
      active_vaccine: {
        id: "",
        name: "",
        sight: "",
        disease: "",
      },
    };
    this.fetchVaccines();
  }

  async fetchVaccines() {
    const res = (await UsersApi.data("/admin/vaccines")) || [];
    this.setState({ ...this.state, vaccines: res === "Error" ? [] : res });
  }

  handleClose = () => {
    this.setState({ ...this.state, edit_dialog: false });
  };

  Closehandle = () => {
    this.setState({ ...this.state, delete: false });
  };

  handleDelete = async (e) => {
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
    let res = await api.post(`/admin/delete-vaccine`, _fcontent);
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
    let res = await api.post(`/admin/edit-vaccine`, _fcontent);
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
        <Nav active="vaccines" />
        <div className="main-content">
          <Header />
          <main>
            <div className="fullwidth-ctr">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Vaccines Available</h3>
                    <TextField
                      name="vaccine_name"
                      variant="outlined"
                      label="Search Vaccine"
                      style={{
                        width: "15%",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Vaccine Name</td>
                          <td>Sight of Vaccination</td>
                          <td>Disease Prevented</td>
                          <td></td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.vaccines.length === 0 ? (
                          <tr>
                            <td>No Vaccine Exists</td>
                          </tr>
                        ) : (
                          this.state.vaccines.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td>{v.vaccine_name}</td>
                                <td>{v.sight_of_vaccination}</td>
                                <td>{v.disease_prevented}</td>
                                <td>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      this.setState({
                                        ...this.state,
                                        edit_dialog: true,
                                        active_vaccine: {
                                          ...this.state.active_vaccine,
                                          id: v.vaccine_id,
                                          name: v.vaccine_name,
                                          sight: v.sight_of_vaccination,
                                          disease: v.disease_prevented,
                                        },
                                      });
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    style={{ color: "red" }}
                                    variant="contained"
                                    onClick={() => {
                                      this.setState({
                                        ...this.state,
                                        delete: true,
                                        active_vaccine: {
                                          ...this.state.active_vaccine,
                                          id: v.vaccine_id,
                                          name: v.vaccine_name,
                                        },
                                      });
                                    }}
                                  >
                                    Delete
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
          open={this.state.delete}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Delete Vaccine</DialogTitle>
          <form autoComplete="off" onSubmit={this.handleDelete}>
            <DialogContent>
              <DialogContentText>
                {`Want to Delete ${this.state.active_vaccine.name} Vaccine?
                This process is Irreversible.
                Press Ok to Continue`}
                <TextField
                  type="hidden"
                  name="id"
                  variant="standard"
                  value={this.state.active_vaccine.id}
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      active_vaccine: {
                        ...this.state.active_vaccine,
                        id: e.target.value,
                      },
                    });
                  }}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.Closehandle} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Ok
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Dialog
          open={this.state.edit_dialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Delete Vaccine</DialogTitle>
          <form autoComplete="off" onSubmit={this.handleVaccine}>
            <DialogContent>
              <DialogContentText>
                <TextField
                  name="vaccine_name"
                  variant="standard"
                  value={this.state.active_vaccine.name}
                  label="Vaccine Name"
                  style={{
                    width: "85%",
                    margin: "20px",
                  }}
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      active_vaccine: {
                        ...this.state.active_vaccine,
                        name: e.target.value,
                      },
                    });
                  }}
                />
                <TextField
                  name="sight_of_vaccine"
                  variant="standard"
                  value={this.state.active_vaccine.sight}
                  label="Sight of Vaccination"
                  style={{
                    width: "85%",
                    margin: "20px",
                  }}
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      active_vaccine: {
                        ...this.state.active_vaccine,
                        sight: e.target.value,
                      },
                    });
                  }}
                />
                <TextField
                  name="disease"
                  variant="standard"
                  value={this.state.active_vaccine.disease}
                  label="Disease Prevented"
                  style={{
                    width: "85%",
                    margin: "20px",
                  }}
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      active_vaccine: {
                        ...this.state.active_vaccine,
                        disease: e.target.value,
                      },
                    });
                  }}
                />
                <TextField
                  type="hidden"
                  name="id"
                  variant="standard"
                  value={this.state.active_vaccine.id}
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      active_vaccine: {
                        ...this.state.active_vaccine,
                        id: e.target.value,
                      },
                    });
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

export default Vaccines;
