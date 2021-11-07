import React, { Component } from "react";
import UsersApi from "../../api/users";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Nav from "./components/nav";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import user from "../../config";

class Vaccination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vaccinate: false,
      doctor_vaccination: [],
      recepient_vaccinations: [],
    };
    this.fetchVaccinations();
  }

  CloseVaccinate = () => {
    this.setState({ ...this.state, vaccinate: false });
  };

  async fetchVaccinations() {
    const res =
      (await UsersApi.data(
        `/admin/doctor-vaccinations/${user.user.doctors_id}`
      )) || [];
    this.setState({
      ...this.state,
      doctor_vaccination: res === "Error" ? [] : res,
    });
  }
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
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="vaccinations" />
        <div className="main-content">
          <Header />
          <main>
            <div className="fullwidth-ctr">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Vaccinations Made</h3>
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Number</td>
                          <td>Surname</td>
                          <td>Othername</td>
                          <td>Date of Birth</td>
                          <td>Birth Place</td>
                          <td>Vaccines</td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.doctor_vaccination.length === 0 ? (
                          <tr>
                            <td>No Vaccination Made</td>
                          </tr>
                        ) : (
                          this.state.doctor_vaccination.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td>{v.recepient_number}</td>
                                <td>{v.sur_name}</td>
                                <td>{v.other_name}</td>
                                <td>{v.date_of_birth}</td>
                                <td>{v.birth_place}</td>
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
      </>
    );
  }
}

export default Vaccination;
