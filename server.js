const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

app.use(
  cors({ origin: [process.env.FRONTEND_URI, process.env.LIVE_FRONTEND_URI] })
);

const connectDb = require("./utils/connectDb");
connectDb();

const setUpGoogleStrategy = require("./utils/googleStrategy");
setUpGoogleStrategy();

const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");

const PORT = process.env.PORT || 8002;

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => res.send("Moviestry"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URI + "/user/dashboard",
    failureRedirect: process.env.FRONTEND_URI + "/login",
  })
);

app.use("/api/v1", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/media", movieRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
