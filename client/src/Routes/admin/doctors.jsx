import React, { Component } from "react";
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
import UsersApi from "../../api/users";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Doctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "Please Wait....",
      messageState: "",
      delete: false,
      doctors: [],
      active_doctor: {
        id: "",
        name: "",
      },
    };
    this.fetchDoctors();
  }

  Closehandle = () => {
    this.setState({ ...this.state, delete: false });
  };

  async fetchDoctors() {
    const res = (await UsersApi.data("/admin/doctors")) || [];
    this.setState({ ...this.state, doctors: res === "Error" ? [] : res });
  }

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
    let res = await api.post(`/admin/delete-doctor`, _fcontent);
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
        <Nav active="doctors" />
        <div className="main-content">
          <Header />
          <main>
            <div className="fullwidth-ctr">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Doctors Available</h3>
                    <TextField
                      name="doctor_name"
                      variant="outlined"
                      label="Search Doctor"
                      style={{
                        width: "15%",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>FirstName</td>
                          <td>Surname</td>
                          <td>Hospital</td>
                          <td>Contact</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.doctors.length === 0 ? (
                          <tr>
                            <td>No Doctor Exists</td>
                          </tr>
                        ) : (
                          this.state.doctors.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td>{v.doctor_firstname}</td>
                                <td>{v.doctor_surname}</td>
                                <td>{v.doctor_hospital}</td>
                                <td>{v.doctor_contact}</td>
                                <td>
                                  <Button
                                    style={{ color: "red" }}
                                    variant="contained"
                                    onClick={() => {
                                      this.setState({
                                        ...this.state,
                                        delete: true,
                                        active_doctor: {
                                          ...this.state.active_doctor,
                                          id: v.doctors_id,
                                          name: v.doctor_firstname,
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
          onClose={this.Closehandle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Delete Doctor</DialogTitle>
          <form autoComplete="off" onSubmit={this.handleDelete}>
            <DialogContent>
              <DialogContentText>
                {`Want to Delete Doctor ${this.state.active_doctor.name}?
                This process is Irreversible.
                Press Ok to Continue`}
                <TextField
                  type="hidden"
                  name="id"
                  variant="standard"
                  value={this.state.active_doctor.id}
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      active_doctor: {
                        ...this.state.active_doctor,
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
      </>
    );
  }
}

export default Doctors;
