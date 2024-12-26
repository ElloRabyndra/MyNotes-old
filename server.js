const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = 2000;

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

// =====================================================================
// App Routes
app.use("/", require("./routes/get"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/notes"));
app.use("/", require("./routes/profile"));

// =====================================================================
app.listen(port, function () {
  console.log("Listening to http://localhost:2000");
});
