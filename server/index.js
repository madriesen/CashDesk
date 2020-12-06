const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

// create app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.use("/", require("./routes/index"));

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connectted to DB!")
);
// clear orders in database
app.get("/");

// create server
const server = require("http").createServer(app);

// websocket for orders
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  if (socket.id) console.log("socket connected");
});
global.io = io;

// start application
const port = process.env.PORT || 5000;
server.listen(String(port), () =>
  console.log(`Server started on port http://localhost:${port}`)
);

module.exports = app;
