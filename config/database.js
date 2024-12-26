const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const database = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

database.connect(function (error) {
  if (error) throw error;
  console.log("Berhasil terhubung ke database");
});

module.exports = database;
