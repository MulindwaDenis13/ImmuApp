import React, { Component } from "react";
import UsersApi from "../api/users";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Header from "./header";
import Footer from "./footer";
import { Link } from "react-router-dom";

class Recepients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
      vaccinate: false,
      recepients: [],
      recepient_vaccinations: [],
      recepient: {},
      data: 0,
    };
    this.fetchRecepients();
  }

  async fetchRecepients() {
    const res = (await UsersApi.data("/admin/recepients")) || [];
    this.setState({ ...this.state, recepients: res === "Error" ? [] : res });
  }

  handleClose = () => {
    this.setState({ ...this.state, dialog: false });
  };

  CloseVaccinate = () => {
    this.setState({ ...this.state, vaccinate: false });
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
        <div className="main-content">
          <Header />
          <main>
            <div className="fullwidth-ctr">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Recepients Available</h3>
                    <TextField
                      name="recepient_number"
                      variant="outlined"
                      label="Recepient Number"
                      style={{
                        width: "15%",
                      }}
                      onKeyUp={async (e) => {
                        let res = await UsersApi.data(
                          `/admin/recepient-search/${e.target.value}`
                        );
                        this.setState({
                          ...this.state,
                          recepients: res === "Error" ? [] : res,
                        });
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Number</td>
                          <td>Surname</td>
                          <td>Othername</td>
                          <td>District</td>
                          <td>Place of Birth</td>
                          <td>Date of Birth</td>
                          <td></td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.recepients.length === 0 ? (
                          <tr>
                            <td>No Recepient Exists</td>
                          </tr>
                        ) : (
                          this.state.recepients.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td>{v.recepient_number}</td>
                                <td>{v.sur_name}</td>
                                <td>{v.other_name}</td>
                                <td>{v.district}</td>
                                <td>{v.birth_place}</td>
                                <td>{v.date_of_birth}</td>
                                <td>
                                  <Button
                                    style={{ color: "red" }}
                                    variant="contained"
                                    onClick={async () => {
                                      this.setState({
                                        ...this.state,
                                        dialog: true,
                                        recepient: v,
                                      });
                                    }}
                                  >
                                    Details
                                  </Button>
                                </td>
                                <td>
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
          open={this.state.dialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Recepient Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <table width="100%">
                <tbody>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>Surname :</span>
                      {this.state.recepient.sur_name}
                    </td>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>Othername :</span>
                      {this.state.recepient.other_name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Date of Birth :
                      </span>
                      {this.state.recepient.date_of_birth}
                    </td>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Place of Birth :
                      </span>
                      {this.state.recepient.birth_place}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Child Gender :
                      </span>
                      {this.state.recepient.child_gender}
                    </td>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Birth Order :
                      </span>
                      {this.state.recepient.birth_order}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Birth Weight :
                      </span>
                      {this.state.recepient.birth_weight}kg
                    </td>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>Child Age :</span>
                      {this.state.recepient.child_age}years
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>District :</span>
                      {this.state.recepient.district}
                    </td>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>Subcounty :</span>
                      {this.state.recepient.sub_county}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>Village :</span>
                      {this.state.recepient.village}
                    </td>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Mother's name :
                      </span>
                      {this.state.recepient.mother_name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Mother's Contact :
                      </span>
                      {this.state.recepient.mother_contact}
                    </td>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Mother's Occupation :
                      </span>
                      {this.state.recepient.mother_occupation}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Mother's Education :
                      </span>
                      {this.state.recepient.mother_education}
                    </td>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Father's name :
                      </span>
                      {this.state.recepient.father_name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Father's Contact :
                      </span>
                      {this.state.recepient.father_contact}
                    </td>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Father's Occupation :
                      </span>
                      {this.state.recepient.father_occupation}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Father's Religion :
                      </span>
                      {this.state.recepient.father_religion}
                    </td>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Father's Education :
                      </span>
                      {this.state.recepient.father_education}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bolder" }}>
                        Mother's Religion :
                      </span>
                      {this.state.recepient.mother_religion}
                    </td>
                  </tr>
                </tbody>
              </table>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

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
      </>
    );
  }
}

export default Recepients;
