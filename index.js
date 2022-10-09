const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const errorHandler = require("./middleware/errorHandler");
const toolsRoutes = require("./routes/v1/tools.route");
const { connectToServer } = require("./utils/dbConnect");

// middleware
app.use(express.json());
app.use(cors());
// static file without create route
app.use(express.static("public"));
// serve static file with dynamic content
app.set("view engine", "ejs");

//custom middleware
// app.use(viewCount);

// database connection
connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`server running at ${port}`);
    });
  } else {
    console.log(err);
  }
});

// all routes here
app.use("/api/v1/tools", toolsRoutes);

app.get("/", (req, res) => {
  // res.send("electrix server running");
  // res.sendFile(__dirname + "/public/test.html");
  res.render("home.ejs", {
    id: 4,
  });
});

// if user hit a route that dosent exists
app.all("*", (req, res) => {
  res.send("No route found");
});

//global error handler
app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
