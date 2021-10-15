const express = require("express");
const conn = require("./database/db");
const cors = require("cors");
const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server Started on PORT ${port}`);
});
