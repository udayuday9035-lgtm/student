const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// TEST API
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});


// ADD STUDENT API
app.post("/addStudent", (req, res) => {

  const {
    fullName,
    email,
    phone,
    college,
    course,
    year,
    gender,
    dateOfBirth,
    address,
    photo,
    status
  } = req.body;

  const sql = `
    INSERT INTO students
    (fullName, email, phone, college,
    course, year, gender,
    dateOfBirth, address, photo, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      fullName,
      email,
      phone,
      college,
      course,
      year,
      gender,
      dateOfBirth,
      address,
      photo,
      status
    ],
    (err, result) => {

      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.send("Student Added Successfully");
      }
    }
  );
});


// GET ALL STUDENTS
app.get("/students", (req, res) => {

  const sql = "SELECT * FROM students";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


// DELETE STUDENT
app.delete("/deleteStudent/:id", (req, res) => {

  const id = req.params.id;

  const sql =
    "DELETE FROM students WHERE id=?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("Deleted Successfully");
    }
  });
});


// UPDATE STUDENT
app.put("/updateStudent/:id", (req, res) => {

  const id = req.params.id;

  const {
    fullName,
    email,
    phone,
    college
  } = req.body;

  const sql = `
    UPDATE students
    SET fullName=?,
    email=?,
    phone=?,
    college=?
    WHERE id=?
  `;

  db.query(
    sql,
    [fullName, email, phone, college, id],
    (err, result) => {

      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send("Updated Successfully");
      }
    }
  );
});


app.listen(process.env.PORT, () => {
  console.log(
    `Server Running On Port ${process.env.PORT}`
  );
});