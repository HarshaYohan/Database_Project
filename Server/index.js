const express = require("express");
const mysql = require("mysql2");
const app = express(); // This should come after requiring express
const cors = require("cors");

const PORT = 5000;
app.use(cors());
app.use(express.json());

let db;

function handleConnection() {
  db = mysql.createConnection(
    {
      user: "root",
      host: "localhost",
      password: "#2024mySQLdatabase",
      database: "supplychainmanagementsystem",
      port: 3307,
    },
    (err) => {
      console.log(err);
    }
  );
}

handleConnection();

app.post("/signup", (req, res) => {
  const { fullname, email, phonenumber, password } = req.body;
  const query =
    "INSERT INTO employee (Name, PhoneNumber, Address, Role, Email, Password_) values (?,?,?,?,?,?)";
  db.query(
    query,
    [fullname, phonenumber, "67/kandy", "Manager", email, password],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});


app.post("/login", (req, res) => {
    const { email, password } = req.body; // Make sure to destructure password here
    const query = "SELECT * FROM employee WHERE Email = ? AND Password_ = ?"; // Fixed the table name case
  
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).send("Database error");
      }
  
      if (results.length === 0) {
        return res.status(401).send("Incorrect password or email. Try again");
      }
  
      // User found
      res.send("Login successful");
    });
  });

app.listen(PORT, () => {
  console.log(`Your server is running on PORT ${PORT}`);
});
