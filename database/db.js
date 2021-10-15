const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "immunisation_db_secure",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Database Connected....");
});

module.exports = conn;
