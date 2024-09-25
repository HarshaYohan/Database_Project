const express = require("express");
const mysql = require("mysql2");
const app = express(); // This should come after requiring express
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Your server is running on PORT ${PORT}`);
});
