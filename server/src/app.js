const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const http = require("http");
const userAuth = require("./lib/userAuth");
const routes = require("./routes");
require("dotenv/config");
require("./database");
const webRTCSocket = require("./socket");

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// middleware
app.use(userAuth);
app.use("/api/v1", routes);

app.use("/uploads", express.static("uploads"));

webRTCSocket(server);

server.listen(PORT, () => {
  const dir = "./uploads";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log(`✅ server ON ${PORT}`);
});