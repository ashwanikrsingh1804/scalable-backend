var express = require('express');
var router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");



const db = mysql.createPool({
  host: "mdeicalbilling.c7dcqmwvm5db.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Password#098",
  database: "medicalbilling",
});

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/api/get", function (req, res, next)  {
  const sqlGet = "SELECT * FROM crud";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

router.post("/api/post", function (req, res, next) {
  const { name, email, contact } = req.body;
  const sqlInsert =
    "INSERT INTO crud (name, email, contact) VALUES (?, ?, ?)";
  db.query(sqlInsert, [name, email, contact], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

router.delete("/api/remove/:id", function(req, res, next) {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM crud WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

router.get("/api/get/:id", function(req, res, next) {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM crud WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

router.put("/api/update/:id", function(req, res, next)  {
    const { id } = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate = "UPDATE crud SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
  });




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ashwani' });
 });

module.exports = router;


