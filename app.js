const express = require("express");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const routes = require("./routes/index");

/**
 * GENERAL SETUP
 */
require("./config/passport");
const app = express();

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/**
 * Routes SETUP
 */
app.use("/mystorage", routes.storage);
app.use("/", routes.auth);

/**
 * ERROR HANDLING
 */
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).render("serverError", {
    status: err.statusCode || 500,
    message: err.message,
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Running at http://localhost:${process.env.PORT}`)
);
