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
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// all medcine
router.get('/medicine', function(req, res, next) {
  try {
    const sqlGet = "SELECT * FROM medicine WHERE available = true";
    db.query(sqlGet, (error, result) => {
      res.send(result);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ashwani' });
 });

module.exports = router;


