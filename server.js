const express = require("express");
const passport = require("passport");
const config = require("./config/config");
const path = require("path");
const db = require("./database");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log(err));

// Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Connect routes
const users = require("./routes/api/users");
const categories = require("./routes/api/categories");
const products = require("./routes/api/products");
const home = require("./routes/api/home");
const orders = require("./routes/api/orders");

// define routs
app.use("/api/users", users);
app.use("/api/categories", categories);
app.use("/api/home", home);
app.use("/api/products", products);
app.use("/api/orders", orders);

// Static files
app.use(
  express.static(__dirname + "/public", {
    etag: config.etag,
    maxage: config.maxage
  })
);
app.use(
  express.static(__dirname + "/client/build", {
    etag: config.etag,
    maxage: config.maxage
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = config.appPort;

app.listen(port, () => console.log(`Server started on port ${port}`));
