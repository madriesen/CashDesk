const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

// create app
const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
}

// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.options('*', cors());

// routes
app.use("/", require("./routes/index"));

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.info("connectted to DB!")
);
// clear orders in database
app.get("/");

// create server
const server = require("http").createServer(app);

// websocket for orders
const io = require("socket.io")(server, {cors: corsOptions});
io.on("connection", (socket) => {
  if (socket.id) console.info("socket connected");
});
global.io = io;

// start application
const port = process.env.PORT || 5000;
server.listen(String(port), () =>
  console.info(`Server started on port http://localhost:${port}`)
);

module.exports = app;
