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
import { Redirect } from "react-router-dom";
import UsersApi from "../api/users";
import MuiAlert from "@material-ui/lab/Alert";
import Header from "./header";
import "../design/forms.css";
import "../design/main.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Newpatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      open: false,
      message: "",
      messageState: "",
      currentTab: 0,
      backTabButtonClickable: false,
      submitButton: false,
      districts: [],
      subcounties: [],
      villages: [],
      redirect: {
        status: false,
        url: null,
      },
      onOpenState: {
        patient_number: "",
      },
      required: {
        surname: "",
        other_names: "",
      },
    };
    this.onOpenFile();
    this.fetchDistricts();
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

  fetchVillage = async (e) => {
    const res = (await UsersApi.data(`/admin/village/${e.target.value}`)) || [];
    this.setState({ ...this.state, villages: res === "Error" ? [] : res });
  };

  async onOpenFile() {
    const p_number = await UsersApi.data("/admin/pnumber");
    if (p_number.status === true) {
      this.setState({
        ...this.state,
        onOpenState: {
          ...this.state.onOpenState,
          patient_number: p_number._pnumber,
        },
      });
    }
  }

  closePopUp = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      ...this.state,
      message: "",
      messageState: "",
      open: false,
    });
    if (this.state.redirect.url !== null) {
      this.setState({
        ...this.state,
        redirect: {
          ...this.state.redirect,
          status: true,
        },
      });
    }
  };

  handleSlideForward = () => {
    let err = false;
    Object.values(this.state.required).forEach((e) => {
      if (e.length === 0) {
        err = true;
        this.setState({
          ...this.state,
          error: true,
          open: true,
          messageState: "warning",
          message: "These Input Fields are required",
        });
      }
    });
    if (!err) {
      this.setState({
        ...this.state,
        error: false,
        submitButton: true,
        currentTab: 1,
      });
    }
  };

  handleSlideBack = () => {
    if (this.state.currentTab === 0) {
      return;
    } else {
      this.setState({
        ...this.state,
        submitButton: false,
        currentTab: this.state.currentTab - 1,
      });
    }
  };

  handleRecepient = async (e) => {
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
    let res = await api.post("/admin/new-recepient", _fcontent);
    if (res !== "Error") {
      if (res.status === true) {
        this.setState({
          ...this.state,
          message: res.data,
          messageState: "success",
          redirect: {
            ...this.state.redirect,
            url: `/`,
          },
        });
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
    const { redirect } = this.state;
    if (redirect.status) {
      return <Redirect to={redirect.url} />;
    }
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
            <div className="fullwidth-ctr">
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
                  noValidate
                  onSubmit={this.handleRecepient}
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
                        <TextField
                          name="recepient_number"
                          variant="outlined"
                          label="New Recepient Number"
                          value={this.state.onOpenState.patient_number}
                          style={{
                            width: "250px",
                            margin: "20px 0px",
                          }}
                        />
                      </div>

                      <div className="">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginRight: 10 }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          aria-describedby={this.id}
                          variant="contained"
                          color="primary"
                          style={{ marginLeft: 10 }}
                          disabled={!this.state.submitButton}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <div
                        className=""
                        style={
                          this.state.currentTab === 0
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <div className="inputCtr">
                          <h4>Recepient Bio Data</h4>
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
                                error={this.state.error}
                                onChange={(e) => {
                                  this.setState({
                                    ...this.state,
                                    required: {
                                      ...this.state.required,
                                      surname: e.target.value,
                                    },
                                  });
                                }}
                              />
                              <TextField
                                name="other_names"
                                variant="outlined"
                                label="Other Names"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                                error={this.state.error}
                                onChange={(e) => {
                                  this.setState({
                                    ...this.state,
                                    required: {
                                      ...this.state.required,
                                      other_names: e.target.value,
                                    },
                                  });
                                }}
                              />
                              <TextField
                                name="dob"
                                variant="outlined"
                                helperText="Date of Birth"
                                type="date"
                                style={{
                                  width: "75%",
                                  margin: "20px 20px 0px 20px",
                                }}
                              />
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                  inputProps={{ name: "gender" }}
                                  labelId="gender"
                                  id="select_gender"
                                  label="Gender"
                                  defaultValue=""
                                >
                                  <MenuItem value="Male">Male</MenuItem>
                                  <MenuItem value="Female">Female</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                            <div className="inpts_center">
                              <TextField
                                type="number"
                                name="birth_weight"
                                variant="outlined"
                                label="Birth Weight in Kg"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                type="number"
                                name="birth_order"
                                variant="outlined"
                                label="Birth Order"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="place_of_birth"
                                variant="outlined"
                                label="Place of Birth"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="age"
                                variant="outlined"
                                label="Age"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                            </div>
                            <div className="inpts_on_right">
                              <FormControl
                                variant="outlined"
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
                                          <MenuItem
                                            value={v.district_name}
                                            key={i}
                                          >
                                            {v.district_name}
                                          </MenuItem>
                                        );
                                      })}
                                </Select>
                              </FormControl>

                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="subcounty">
                                  Subcounty
                                </InputLabel>
                                <Select
                                  inputProps={{ name: "sub_county" }}
                                  labelId="subcounty"
                                  id="select_sub"
                                  label="subcounty"
                                  defaultValue=""
                                  onChange={this.fetchVillage}
                                >
                                  {this.state.subcounties.length === 0
                                    ? ""
                                    : this.state.subcounties.map((v, i) => {
                                        return (
                                          <MenuItem
                                            value={v.sub_county_name}
                                            key={i}
                                          >
                                            {v.sub_county_name}
                                          </MenuItem>
                                        );
                                      })}
                                </Select>
                              </FormControl>

                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="village">Village</InputLabel>
                                <Select
                                  inputProps={{ name: "village" }}
                                  labelId="village"
                                  id="select_village"
                                  label="village"
                                  defaultValue=""
                                >
                                  {this.state.villages.length === 0
                                    ? ""
                                    : this.state.villages.map((v, i) => {
                                        return (
                                          <MenuItem
                                            value={v.village_name}
                                            key={i}
                                          >
                                            {v.village_name}
                                          </MenuItem>
                                        );
                                      })}
                                </Select>
                              </FormControl>
                            </div>
                          </div>
                          <div
                            className=""
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ marginLeft: 10 }}
                              onClick={this.handleSlideForward}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div
                        className=""
                        style={
                          this.state.currentTab === 1
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <div className="inputCtr">
                          <h4>Parent Details</h4>
                          <div className="inputs_ctr">
                            <div className="inpts_on_left">
                              <TextField
                                name="mother_name"
                                variant="outlined"
                                label="Mother's Name"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="mother_contact"
                                variant="outlined"
                                label="Mother's Contact"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="mother_occupation"
                                variant="outlined"
                                label="Mother's Occupation"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="religion">
                                  Mother's Religion
                                </InputLabel>
                                <Select
                                  inputProps={{ name: "mother_religion" }}
                                  labelId="religion"
                                  id="select_religion"
                                  label="Religion"
                                  defaultValue=""
                                >
                                  <MenuItem value="Christian">
                                    Christian
                                  </MenuItem>
                                  <MenuItem value="Muslim">Muslim</MenuItem>
                                  <MenuItem value="Pentecostal">
                                    Pentecostal
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                            <div className="inpts_center">
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="education_level">
                                  Mother's Education Level
                                </InputLabel>
                                <Select
                                  inputProps={{
                                    name: "mother_education_level",
                                  }}
                                  labelId="education_level"
                                  id="select_gender"
                                  label="Education Level"
                                  defaultValue=""
                                >
                                  <MenuItem value="primary">Primary</MenuItem>
                                  <MenuItem value="o level">O Level</MenuItem>
                                  <MenuItem value="a level">A Level</MenuItem>
                                  <MenuItem value="tertiary">Tertiary</MenuItem>
                                  <MenuItem value="university">
                                    University
                                  </MenuItem>
                                </Select>
                              </FormControl>
                              <TextField
                                name="father_name"
                                variant="outlined"
                                label="Father's Name"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="father_contact"
                                variant="outlined"
                                label="Father's Contact"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="father_occupation"
                                variant="outlined"
                                label="Father's Occupation"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                            </div>
                            <div className="inpts_on_right">
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="education_level">
                                  Father's Education Level
                                </InputLabel>
                                <Select
                                  inputProps={{
                                    name: "father_education_level",
                                  }}
                                  labelId="education_level"
                                  id="select_gender"
                                  label="Education Level"
                                  defaultValue=""
                                >
                                  <MenuItem value="primary">Primary</MenuItem>
                                  <MenuItem value="o level">O Level</MenuItem>
                                  <MenuItem value="a level">A Level</MenuItem>
                                  <MenuItem value="tertiary">Tertiary</MenuItem>
                                  <MenuItem value="university">
                                    University
                                  </MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="religion">
                                  Father's Religion
                                </InputLabel>
                                <Select
                                  inputProps={{ name: "father_religion" }}
                                  labelId="religion"
                                  id="select_religion"
                                  label="Religion"
                                  defaultValue=""
                                >
                                  <MenuItem value="Christian">
                                    Christian
                                  </MenuItem>
                                  <MenuItem value="Muslim">Muslim</MenuItem>
                                  <MenuItem value="Pentecostal">
                                    Pentecostal
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                          </div>
                          <div
                            className=""
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ marginRight: 10 }}
                              onClick={this.handleSlideBack}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ marginLeft: 10 }}
                              onClick={this.handleSlideForward}
                              disabled
                            >
                              Next
                            </Button>
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

export default Newpatient;
