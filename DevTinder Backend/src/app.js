const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth.js");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");
const mailRoute = require("./routes/mailRoute.js");
const airouter = require("./routes/openai ");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);
app.use("/", mailRoute);
app.use("/", airouter);
const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database coneect successfully");
    server.listen(process.env.PORT, () => {
      console.log("App islistening on port 7777");
    });
  })
  .catch((err) => {
    console.log("database not connectedd");
  });
