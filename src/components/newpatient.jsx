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
      redirect: {
        status: false,
        url: null,
      },
    };
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
            <div className="fullwidth-ctr">
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
                  noValidate
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
                        <TextField
                          name="patient_number"
                          variant="outlined"
                          label="New Patient Number"
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
                          <h4>Patient Bio Data</h4>
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
                                  <MenuItem value="M">Male</MenuItem>
                                  <MenuItem value="F">Female</MenuItem>
                                </Select>
                              </FormControl>
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
                              <TextField
                                name="email_address"
                                variant="outlined"
                                label="Email Address:(If Any)"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="pt_occupation"
                                variant="outlined"
                                label="Occupation"
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
                                <InputLabel id="education_level">
                                  Education Level
                                </InputLabel>
                                <Select
                                  inputProps={{ name: "education_level" }}
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
                            </div>
                            <div className="inpts_on_right">
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="marital_status">
                                  Marital Status
                                </InputLabel>
                                <Select
                                  inputProps={{ name: "marital_status" }}
                                  labelId="marital_status"
                                  id="select_marital_status"
                                  label="Marital Status"
                                  defaultValue=""
                                >
                                  <MenuItem value="Single">Single</MenuItem>
                                  <MenuItem value="Married">Married</MenuItem>
                                  <MenuItem value="Divorced">Divorced</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="religion">Religion</InputLabel>
                                <Select
                                  inputProps={{ name: "religion" }}
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
                          <h4>Patient Address &amp; Next Of Kin</h4>
                          <div className="inputs_ctr">
                            <div className="inpts_on_left">
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
                                  required
                                  labelId="district"
                                  label="District"
                                  defaultValue=""
                                  onChange={async (e) => {
                                    const sub_counties = await UsersApi.data(
                                      `/user/all/subcounties/${e.target.value}`
                                    );
                                    if (
                                      sub_counties.length !== 0 &&
                                      sub_counties !== "Error"
                                    ) {
                                      this.setState({
                                        ...this.state,
                                        address: {
                                          ...this.state.address,
                                          sub_counties,
                                        },
                                      });
                                    }
                                  }}
                                >
                                  {this.state.address.districts.map((v, i) => {
                                    return (
                                      <MenuItem value={v.district_id} key={i}>
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
                                <InputLabel id="sub_county">
                                  Sub County
                                </InputLabel>
                                <Select
                                  inputProps={{ name: "sub_county" }}
                                  required
                                  labelId="sub_county"
                                  // id="select_su"
                                  label="Sub County"
                                  defaultValue=""
                                  onChange={async (e) => {
                                    const parishes = await UsersApi.data(
                                      `/user/all/parishes/${e.target.value}`
                                    );
                                    if (
                                      parishes.length !== 0 &&
                                      parishes !== "Error"
                                    ) {
                                      this.setState({
                                        ...this.state,
                                        address: {
                                          ...this.state.address,
                                          parishes,
                                        },
                                      });
                                    }
                                  }}
                                >
                                  {this.state.address.sub_counties.map(
                                    (v, i) => {
                                      return (
                                        <MenuItem
                                          value={v.sub_county_id}
                                          key={i}
                                        >
                                          {v.sub_county_name}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                </Select>
                              </FormControl>
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="parish">Parish</InputLabel>
                                <Select
                                  inputProps={{ name: "parish" }}
                                  required
                                  labelId="parish"
                                  label="Parish"
                                  defaultValue=""
                                  onChange={async (e) => {
                                    const villages = await UsersApi.data(
                                      `/user/all/villages/${e.target.value}`
                                    );
                                    if (
                                      villages.length !== 0 &&
                                      villages !== "Error"
                                    ) {
                                      this.setState({
                                        ...this.state,
                                        address: {
                                          ...this.state.address,
                                          villages,
                                        },
                                      });
                                    }
                                  }}
                                >
                                  {this.state.address.parishes.map((v, i) => {
                                    return (
                                      <MenuItem value={v.parish_id} key={i}>
                                        {v.parish_name}
                                      </MenuItem>
                                    );
                                  })}
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
                                <InputLabel id="village">Village</InputLabel>
                                <Select
                                  inputProps={{ name: "village" }}
                                  required
                                  labelId="village"
                                  // id="select_su"
                                  label="Villages"
                                  defaultValue="0"
                                >
                                  {this.state.address.villages.map((v, i) => {
                                    return (
                                      <MenuItem value={v.village_id} key={i}>
                                        {v.village_name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                              <TextField
                                name="tribe"
                                variant="outlined"
                                label="Tribe"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                            </div>
                            <div className="inpts_on_right">
                              <TextField
                                name="nk_surname"
                                variant="outlined"
                                label="Next Of Kin Surname"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="nk_first_name"
                                variant="outlined"
                                label="Next Of Kin Firstname"
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
                                <InputLabel id="nk_relationship">
                                  Relationship With Patient
                                </InputLabel>
                                <Select
                                  inputProps={{ name: "nk_relationship" }}
                                  labelId="nk_relationship"
                                  id="nk_relationship"
                                  label="Relationship With Patient"
                                  defaultValue=""
                                >
                                  <MenuItem value="mother">Mother</MenuItem>
                                  <MenuItem value="father">Father</MenuItem>
                                  <MenuItem value="guardian">Guardian</MenuItem>
                                  <MenuItem value="relative">Relative</MenuItem>
                                  <MenuItem value="friend">Friend</MenuItem>
                                </Select>
                              </FormControl>
                              <TextField
                                name="nk_telephone"
                                variant="outlined"
                                label="Phone Number"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
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
