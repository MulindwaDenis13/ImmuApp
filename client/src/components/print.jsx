import React, { Component } from "react";
import "../design/print.css";
import user from "../config";

class Print extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getDate() {
    let date =
      new Date(Date.now()).getDate() +
      " / " +
      (new Date(Date.now()).getMonth() + 1) +
      " / " +
      new Date(Date.now()).getFullYear();
    return date;
  }

  render() {
    return (
      <>
        <div className="print-ctr">
          <div className="print">
            <div className="print-pharmacy">
              <span>Child Immunisation</span>
            </div>
            <div className="print-title">Immunisation Receipt</div>
            <div className="date">Date: {this.getDate()}</div>
            <div className="date">Child No: {this.props.recepient}</div>
            <div className="content">
              <table width="100%">
                <thead>
                  <tr>
                    <td>No</td>
                    <td>Vaccines</td>
                    <td>Sight</td>
                    <td>Disease</td>
                  </tr>
                </thead>
                <tbody>
                  {this.props.data.length === 0 ? (
                    <tr>
                      <td>No Content To Print</td>
                    </tr>
                  ) : (
                    this.props.data.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{v.vaccine_name}</td>
                          <td>{v.sight_of_vaccination}</td>
                          <td>{v.disease_prevented}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                <thead>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Doctor</td>
                    <td>{user.user.doctor_surname}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Hospital</td>
                    <td>{user.user.doctor_hospital}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Return</td>
                    <td>24-03-2022</td>
                  </tr>
                </thead>
              </table>
              Please Dont Forget this recepiet at any Visit
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Print;
