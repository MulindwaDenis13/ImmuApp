const router = require("express").Router();
const conn = require("../database/db");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  conn.query(
    `SELECT * FROM doctors_tbl WHERE 
    doctor_username = ? AND doctor_password = ?`,
    [username, password],
    (first_err, first_res) => {
      if (first_err) {
        res.send({ status: false });
      } else {
        first_res.length === 0
          ? res.send({ status: false })
          : res.send({ status: true, user: first_res[0] });
      }
    }
  );
});

router.post("/new-vaccine", async (req, res) => {
  const { vaccine_name, sight_of_vaccine, disease } = req.body;
  conn.query(
    `SELECT * FROM vaccines_tbl WHERE vaccine_name = ?`,
    vaccine_name,
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
        res.send({ status: false, data: "An Error Occured" });
      } else {
        if (first_res.length == 0) {
          conn.query(
            `INSERT INTO vaccines_tbl SET ?`,
            {
              vaccine_name: vaccine_name,
              sight_of_vaccination: sight_of_vaccine,
              disease_prevented: disease,
            },
            (insert_err, insert_res) => {
              if (insert_err) {
                console.log(insert_err);
                res.send({ data: "An Error Occured", status: false });
              } else {
                res.send({ status: true, data: "Vaccine Added Successfully" });
              }
            }
          );
        } else {
          res.send({ status: false, data: `${vaccine_name} Already Exists` });
        }
      }
    }
  );
});

router.post("/edit-vaccine", async (req, res) => {
  const { id, vaccine_name, sight_of_vaccine, disease } = req.body;
  conn.query(
    `UPDATE vaccines_tbl SET ? 
    WHERE vaccine_id = ?`,
    [
      {
        vaccine_name: vaccine_name,
        sight_of_vaccination: sight_of_vaccine,
        disease_prevented: disease,
      },
      id,
    ],
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
        res.send({ data: "An Error Occured", status: false });
      } else {
        res.send({ data: "Vaccine Edited Successfully", status: true });
      }
    }
  );
});

router.post("/delete-vaccine", async (req, res) => {
  const { id } = req.body;
  conn.query(
    `DELETE FROM vaccines_tbl
     WHERE vaccine_id = ?`,
    id,
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
        res.send({ data: "An Error Occured", status: false });
      } else {
        res.send({ data: "Vaccine Deleted Successfully", status: true });
      }
    }
  );
});

router.post("/new-district", async (req, res) => {
  const { district_name } = req.body;
  conn.query(
    `SELECT * FROM district_tbl WHERE district_name = ?`,
    district_name,
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
        res.send({ data: "An Error Occured", status: false });
      } else {
        if (first_res.length == 0) {
          conn.query(
            `INSERT INTO district_tbl SET ?`,
            {
              district_name: district_name,
            },
            (insert_err, insert_res) => {
              if (insert_err) {
                console.log(insert_err);
                res.send({ data: "An Error Occured", status: false });
              } else {
                res.send({ status: true, data: "District Added Successfully" });
              }
            }
          );
        } else {
          res.send({ status: false, data: `${district_name} Already Exists` });
        }
      }
    }
  );
});

router.post("/new-subcounty", async (req, res) => {
  const { district, sub_name } = req.body;
  conn.query(
    `SELECT * FROM subcounty_tbl WHERE sub_county_name = ?`,
    sub_name,
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
        res.send({ data: "An Error Occured", status: false });
      } else {
        if (first_res.length == 0) {
          conn.query(
            `INSERT INTO subcounty_tbl SET ?`,
            {
              district_id: district,
              sub_county_name: sub_name,
            },
            (insert_err, insert_res) => {
              if (insert_err) {
                console.log(insert_err);
                res.send({ data: "An Error Occured", status: false });
              } else {
                res.send({
                  status: true,
                  data: "Subcounty Added Successfully",
                });
              }
            }
          );
        } else {
          res.send({ status: false, data: `${sub_name} Already Exists` });
        }
      }
    }
  );
});

router.post("/new-village", async (req, res) => {
  const { village_name, sub_county } = req.body;
  conn.query(
    `SELECT * FROM village_tbl WHERE village_name = ?`,
    village_name,
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
        res.send({ data: "An Error Occured", status: false });
      } else {
        if (first_res.length == 0) {
          conn.query(
            `INSERT INTO village_tbl SET ?`,
            {
              sub_county_id: sub_county,
              village_name: village_name,
            },
            (insert_err, insert_res) => {
              if (insert_err) {
                console.log(insert_err);
                res.send({ data: "An Error Occured", status: false });
              } else {
                res.send({
                  status: true,
                  data: "Village Added Successfully",
                });
              }
            }
          );
        } else {
          res.send({ status: false, data: `${village_name} Already Exists` });
        }
      }
    }
  );
});

router.post("/new-hospital", async (req, res) => {
  const { hospital_name, hospital_location } = req.body;
  conn.query(
    `SELECT * FROM hospital_tbl WHERE hospital_name = ?`,
    hospital_name,
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
        res.send({ data: "An Error Occured", status: false });
      } else {
        if (first_res.length == 0) {
          conn.query(
            `INSERT INTO hospital_tbl SET ?`,
            {
              hospital_name: hospital_name,
              hospital_location: hospital_location,
            },
            (insert_err, insert_res) => {
              if (insert_err) {
                console.log(insert_err);
                res.send({ data: "An Error Occured", status: false });
              } else {
                res.send({ status: true, data: "Hospital Added Successfully" });
              }
            }
          );
        } else {
          res.send({ status: false, data: `${hospital_name} Already Exists` });
        }
      }
    }
  );
});

router.post("/new-doctor", async (req, res) => {
  const {
    surname,
    first_name,
    username,
    phone_contact,
    hospital,
    gender,
    password,
    confirm_password,
  } = req.body;
  if (password !== confirm_password) {
    return res.send({ data: "Passwords Do not Match", status: false });
  } else {
    conn.query(
      `SELECT * FROM doctors_tbl WHERE doctor_username = ?`,
      username,
      (first_err, first_res) => {
        if (first_err) {
          console.log(first_err);
          res.send({ data: "An Error Occured", status: false });
        } else {
          if (first_res.length == 0) {
            conn.query(
              `INSERT INTO doctors_tbl SET ?`,
              {
                doctor_surname: surname,
                doctor_firstname: first_name,
                doctor_username: username,
                doctor_contact: phone_contact,
                doctor_hospital: hospital,
                doctor_gender: gender,
                doctor_password: password,
                doctor_role: "doctor",
              },
              (insert_err, insert_res) => {
                if (insert_err) {
                  console.log(insert_err);
                  res.send({ data: "An Error Occured", status: false });
                } else {
                  res.send({ status: true, data: "Doctor Added Successfully" });
                }
              }
            );
          } else {
            res.send({ status: false, data: `Username Already Exists` });
          }
        }
      }
    );
  }
});

router.post("/delete-doctor", async (req, res) => {
  const { id } = req.body;
  conn.query(
    `DELETE FROM doctors_tbl
     WHERE doctors_id = ?`,
    id,
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
        res.send({ data: "An Error Occured", status: false });
      } else {
        res.send({ data: "Doctor Deleted Successfully", status: true });
      }
    }
  );
});

router.post("/new-recepient", async (req, res) => {
  const {
    recepient_number,
    surname,
    other_names,
    dob,
    gender,
    birth_weight,
    birth_order,
    place_of_birth,
    district,
    sub_county,
    village,
    mother_name,
    mother_contact,
    mother_occupation,
    mother_religion,
    mother_education_level,
    father_name,
    father_contact,
    father_occupation,
    father_religion,
    father_education_level,
    date,
    user,
  } = req.body;
  conn.query(
    `INSERT INTO recepients_tbl SET ?`,
    {
      recepient_number: recepient_number,
      sur_name: surname,
      other_name: other_names,
      date_of_birth: dob,
      birth_place: place_of_birth,
      child_gender: gender,
      birth_order: birth_order,
      birth_weight: birth_weight,
      district: district,
      sub_county: sub_county,
      village: village,
      doctors_id: user,
      recepient_date: date,
    },
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
        res.send({ data: "An Error Occured", status: false });
      } else {
        conn.query(
          `INSERT INTO parents_tbl SET ?`,
          {
            recepient: recepient_number,
            mother_name: mother_name,
            mother_contact: mother_contact,
            mother_occupation: mother_occupation,
            mother_religion: mother_religion,
            mother_education: mother_education_level,
            father_name: father_name,
            father_contact: father_contact,
            father_occupation: father_occupation,
            father_religion: father_religion,
            father_education: father_education_level,
          },
          (insert_err, insert_res) => {
            if (insert_err) {
              console.log(insert_err);
              res.send({ data: "An Error Occured", status: false });
            } else {
              res.send({ status: true, data: "Recepient Added Successfully" });
            }
          }
        );
      }
    }
  );
});

router.post("/new-vaccination", async (req, res) => {
  const { data, user, recepient, date } = req.body;
  data.forEach((i) => {
    conn.query(
      `INSERT INTO vaccine_track SET ?`,
      {
        vaccine_id: i.vaccine_name,
      },
      (error, result) => {
        if (error) {
          console.log(error);
          res.send({ data: "An Error Occured", status: false });
        }
      }
    );
  });
  conn.query(
    `INSERT INTO vaccination_tbl SET ?`,
    {
      doctors_id: user,
      recepient_id: recepient,
      vaccines: JSON.stringify(data),
      vaccine_date: date,
    },
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
        res.send({ data: "An Error Occured", status: false });
      } else {
        res.send({ status: true, data: "Vaccination Successful" });
      }
    }
  );
});

router.get("/pnumber", async (req, res) => {
  conn.query(
    `SELECT recepient_number FROM recepients_tbl 
      ORDER BY recepient_id DESC LIMIT 1`,
    (err, sql_res) => {
      if (err) {
        console.log(err);
      } else {
        let last_id =
          sql_res.length > 0
            ? parseInt(sql_res[0].recepient_number.substr(5, 7)) + 1
            : 1;
        let id =
          last_id < 10
            ? "00" + last_id.toString()
            : last_id < 100
            ? "0" + last_id.toString()
            : last_id.toString();
        res.send({ status: true, _pnumber: getPatientNumber(id) });
        function getPatientNumber(id) {
          let date = new Date();
          return (
            (date.getDate() < 10
              ? "0" + date.getDate().toString()
              : date.getDate().toString()) +
            (date.getMonth() < 10
              ? "0" + (date.getMonth() + 1).toString()
              : (date.getMonth() + 1).toString()) +
            id
          );
        }
      }
    }
  );
});

router.get("/recepient/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM recepients_tbl
     WHERE recepient_id = ?`,
    req.params.id,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/hospitals", async (req, res) => {
  conn.query(
    `SELECT * FROM 
  hospital_tbl`,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/vaccines", async (req, res) => {
  conn.query(
    `SELECT * FROM 
  vaccines_tbl`,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/districts", async (req, res) => {
  conn.query(
    `SELECT * FROM 
  district_tbl`,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/subcounty/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM 
  subcounty_tbl WHERE district_id = ?`,
    req.params.id,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/village/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM 
  village_tbl WHERE sub_county_id = ?`,
    req.params.id,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/doctors", async (req, res) => {
  conn.query(
    `SELECT * FROM 
  doctors_tbl 
  WHERE doctor_role = 'doctor'`,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/recepients", async (req, res) => {
  conn.query(
    `SELECT * FROM 
    parents_tbl   JOIN recepients_tbl ON 
      parents_tbl.recepient = recepients_tbl.recepient_number`,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/recepients/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM 
    recepients_tbl WHERE doctors_id = ?`,
    req.params.id,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/vaccinations/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM 
      vaccination_tbl JOIN 
      doctors_tbl ON 
      vaccination_tbl.doctors_id = doctors_tbl.doctors_id 
      WHERE vaccination_tbl.recepient_id = ?`,
    req.params.id,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/recepient-search/:id", async (req, res) => {
  let pattern = /\W/g;
  let check = pattern.test(req.params.id);
  if (check === true) {
    res.send([]);
    return;
  } else {
    conn.query(
      `SELECT * FROM 
        recepients_tbl JOIN parents_tbl ON 
          recepients_tbl.recepient_number = parents_tbl.recepient
         WHERE recepient_number LIKE '%${req.params.id}%'`,
      req.params.id,
      (first_err, first_res) => {
        if (first_err) throw first_err;
        res.send(first_res);
      }
    );
  }
});

router.get("/allVaccinations", async (req, res) => {
  conn.query(
    `SELECT * FROM vaccination_tbl
     JOIN recepients_tbl ON 
     vaccination_tbl.recepient_id = recepients_tbl.recepient_id
      JOIN doctors_tbl ON
       vaccination_tbl.doctors_id = doctors_tbl.doctors_id`,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/doctor-vaccinations/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM vaccination_tbl JOIN recepients_tbl ON 
    vaccination_tbl.recepient_id = recepients_tbl.recepient_id
    JOIN doctors_tbl ON 
    vaccination_tbl.doctors_id = doctors_tbl.doctors_id
    WHERE vaccination_tbl.doctors_id = ?`,
    req.params.id,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/chart-vaccination", async (req, res) => {
  conn.query(
    `SELECT * FROM 
  vaccination_tbl`,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

router.get("/vaccine-usage", async (req, res) => {
  conn.query(
    `SELECT * FROM 
  vaccine_track`,
    (first_err, first_res) => {
      if (first_err) throw first_err;
      res.send(first_res);
    }
  );
});

module.exports = router;
