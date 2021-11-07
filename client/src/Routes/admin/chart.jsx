import React, { Component } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Nav from "./components/nav";
import { Bar } from "react-chartjs-2";
import UsersApi from "../../api/users";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vaccinationChart: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [],
      },
      vaccineUsage: {
        labels: [
          "BCG",
          "DPT",
          "Polio Vaccine",
          "Measles Vaccine",
          "Tetanus Vaccine",
        ],
        datasets: [
          {
            label: "Usage",
            backgroundColor: "rgba(38,185,154,0.31)",
            borderColor: "rgba(38,185,154,0.7)",
            pointBorderColor: "rgba(38,185,154,0.7)",
            pointBackgroundColor: "rgba(38,185,154,0.7)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointBorderWidth: 1,
            data: [34, 60, 12, 22, 44],
          },
        ],
      },
    };
    this.fetchVaccination();
    this.fetchUsage();
  }

  async fetchVaccination() {
    const res = (await UsersApi.data("/admin/chart-vaccination")) || [];
    let jan = 0;
    let feb = 0;
    let mar = 0;
    let apr = 0;
    let may = 0;
    let jun = 0;
    let jul = 0;
    let aug = 0;
    let sep = 0;
    let oct = 0;
    let nov = 0;
    let dec = 0;
    res === "Error"
      ? this.setState({
          ...this.state,
          vaccinationChart: {
            ...this.state.vaccinationChart,
            datasets: [
              {
                label: "Vaccinations",
                backgroundColor: "rgba(38,88,104,0.3)",
                borderColor: "rgba(38,88,104,0.7)",
                pointBorderColor: "rgba(38,88,104,0.7)",
                pointBackgroundColor: "rgba(38,88,104,0.7)",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(181,187,205,1)",
                pointBorderWidth: 1,
                data: [
                  jan,
                  feb,
                  mar,
                  apr,
                  may,
                  jun,
                  jul,
                  aug,
                  sep,
                  oct,
                  nov,
                  dec,
                ],
              },
            ],
          },
        })
      : res.forEach((i) => {
          if (
            new Date(Date.now()).getFullYear() ===
            new Date(parseInt(i.vaccine_date)).getFullYear()
          ) {
            if (new Date(parseInt(i.vaccine_date)).getMonth() === 0) {
              jan++;
            }
            if (new Date(parseInt(i.vaccine_date)).getMonth() === 1) {
              feb++;
            }
            if (new Date(parseInt(i.vaccine_date)).getMonth() === 2) {
              mar++;
            }
            if (new Date(parseInt(i.vaccine_date)).getMonth() === 3) {
              apr++;
            }
            if (new Date(parseInt(i.vaccine_date)).getMonth() === 4) {
              may++;
            }
            if (new Date(parseInt(i.vaccine_date)).getMonth() === 5) {
              jun++;
            }
            if (new Date(parseInt(i.vaccine_date)).getMonth() === 6) {
              jul++;
            }
            if (new Date(parseInt(i.vaccine_date)).getMonth() === 7) {
              aug++;
            }
            if (new Date(parseInt(i.vaccine_date)).getMonth() === 8) {
              sep++;
            }
            if (new Date(parseInt(i.vaccine_date)).getMonth() === 9) {
              oct++;
            }
            if (new Date(parseInt(i.vaccine_date)).getMonth() === 10) {
              nov++;
            }
            if (new Date(parseInt(i.vaccine_date)).getMonth() === 11) {
              dec++;
            }
          }
        });
    this.setState({
      ...this.state,
      vaccinationChart: {
        ...this.state.vaccinationChart,
        datasets: [
          {
            label: "Vaccinations",
            backgroundColor: "rgba(38,88,104,0.3)",
            borderColor: "rgba(38,88,104,0.7)",
            pointBorderColor: "rgba(38,88,104,0.7)",
            pointBackgroundColor: "rgba(38,88,104,0.7)",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(181,187,205,1)",
            pointBorderWidth: 1,
            data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
          },
        ],
      },
    });
  }

  async fetchUsage() {
    const res = (await UsersApi.data("/admin/vaccine-usage")) || [];
    res === "Error"
      ? this.setState({
          ...this.state,
          vaccineUsage: {
            ...this.state.vaccineUsage,
            labels: [],
            datasets: [],
          },
        })
      : res.forEach((i) => {});
  }

  render() {
    return (
      <>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="charts" />
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Vaccinations {new Date(Date.now()).getFullYear()}</h3>
                  </div>
                  <div className="card-body">
                    <Bar data={this.state.vaccinationChart} />
                  </div>
                </div>
              </div>
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Vaccine Usage </h3>
                  </div>
                  <div className="card-body">
                    <Bar data={this.state.vaccineUsage} />
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }
}

export default Chart;
