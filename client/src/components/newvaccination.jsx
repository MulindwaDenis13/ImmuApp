import React, { Component } from "react";
import { TextField, Snackbar, Button, IconButton } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Header from "./header";
import UsersApi from "../api/users";
import Autocomplete from "@material-ui/lab/Autocomplete";
import user from "../config";

import ReactToPrint from "react-to-print";
import Print from "./print";

import "../design/main.css";
import "../design/forms.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Newvaccination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      open: false,
      message: "Please Wait...",
      messageState: "",
      empty_error: false,
      vaccines: [],
      formData: [],
      recepient: {},
      required: {
        vaccine_name: "",
      },
    };
    this.fetchVaccines();
    this.fetchNumber();
  }

  async fetchVaccines() {
    const res = (await UsersApi.data("/admin/vaccines")) || [];
    this.setState({ ...this.state, vaccines: res === "Error" ? [] : res });
  }

  closePopUp = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ ...this.state, open: false, message: "" });
    if (this.state.empty_error) {
      this.setState({ ...this.state, empty_error: false });
    }
  };

  handleVaccination = async () => {
    this.setState({
      ...this.state,
      open: true,
      message: "Please Wait....",
      messageState: "info",
    });
    let content = {};
    let recepient = parseInt(
      new URLSearchParams(window.location.search).get("recepient-id")
    );
    content["user"] = user.user.doctors_id;
    content["data"] = this.state.formData;
    content["recepient"] = recepient;
    content["date"] = Date.now();
    const api = new UsersApi();
    const res = await api.post("/admin/new-vaccination", content);
    if (res !== "Error") {
      if (res.status === true) {
        this.setState({
          ...this.state,
          message: res.data,
          messageState: "success",
        });
        setTimeout(() => {
          window.location.assign("/");
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

  async fetchNumber() {
    let recepient = parseInt(
      new URLSearchParams(window.location.search).get("recepient-id")
    );
    const [res] = (await UsersApi.data(`/admin/recepient/${recepient}`)) || [];
    this.setState({ ...this.state, recepient: res === "Error" ? "" : res });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ ...this.state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    const vaccine_name = this.state.formData.find(
      (e) => e.vaccine_name === _fcontent.vaccine_name
    );
    _fcontent["sight_of_vaccination"] = this.state.vaccines.find(
      (i) => i.vaccine_name === _fcontent.vaccine_name
    ).sight_of_vaccination;
    _fcontent["disease_prevented"] = this.state.vaccines.find(
      (i) => i.vaccine_name === _fcontent.vaccine_name
    ).disease_prevented;
    if (!vaccine_name) {
      this.setState({
        ...this.state,
        open: true,
        message: "Vaccine Added",
        messageState: "success",
        formData: [...this.state.formData, _fcontent],
        print: true,
      });
    } else {
      this.setState({
        ...this.state,
        open: true,
        message: "Vaccine Exists",
        messageState: "warning",
      });
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
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid-left">
              <div className="card">
                <div className="card-header">
                  <h3>Vaccine List</h3>
                  <ReactToPrint
                    trigger={() => {
                      return (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginRight: 10 }}
                        >
                          <span
                            style={{ fontSize: "17.5px", marginRight: "10px" }}
                          >
                            <i className="las la-print"></i>
                          </span>
                          Print
                        </Button>
                      );
                    }}
                    content={() => this.componentRef}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10 }}
                    onClick={this.handleVaccination}
                  >
                    <span style={{ fontSize: "17.5px", marginRight: "10px" }}>
                      <i className="las la-save"></i>
                    </span>
                    Save
                  </Button>
                </div>
                <div className="card-body tbl_ctr">
                  <table width="100%">
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Sight</td>
                        <td>Disease Prevented</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.formData.length === 0 ? (
                        <tr>
                          <td>No Vaccine Added</td>
                        </tr>
                      ) : (
                        this.state.formData.map((v, i) => {
                          return (
                            <tr key={i}>
                              <td className="name_cell">{v.vaccine_name}</td>
                              <td>{v.sight_of_vaccination}</td>
                              <td>{v.disease_prevented}</td>
                              <td>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    let arr = this.state.formData;
                                    arr.splice(i, 1);
                                    this.setState({
                                      ...this.state,
                                      formData: arr,
                                    });
                                  }}
                                >
                                  Remove
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
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div className="card-header card-header-payments">
                    <h3 className="class_payment_header">New Vaccination</h3>
                    <div className="">
                      <Button
                        type="submit"
                        aria-describedby={this.id}
                        variant="contained"
                        color="primary"
                      >
                        <span
                          style={{ fontSize: "17.5px", marginRight: "10px" }}
                        >
                          <i className="las la-plus-circle"></i>
                        </span>
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="inputCtr">
                        <h4>Vaccine Details</h4>
                        <div className="inputs_ctr">
                          <div className="inpts_on_left">
                            <Autocomplete
                              id="combo-box-demo"
                              options={this.state.vaccines}
                              getOptionLabel={(option) =>
                                `${option.vaccine_name}`
                              }
                              // onChange={this.handleChangeVaccineName}
                              // onKeyUp={this.handleDrugNameKeyUp}
                              style={{
                                width: "85%",
                                margin: "20px",
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Search Vaccine"
                                  name="vaccine_name"
                                  variant="outlined"
                                  error={this.state.error}
                                  onChange={(e) => {
                                    this.setState({
                                      ...this.state,
                                      required: {
                                        ...this.state.required,
                                        vaccine_name: e.target.value,
                                      },
                                    });
                                  }}
                                />
                              )}
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
        <div style={{ display: "none" }}>
          {this.state.print ? (
            <Print
              ref={(el) => (this.componentRef = el)}
              data={this.state.formData}
              recepient={this.state.recepient.recepient_number}
            />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default Newvaccination;
