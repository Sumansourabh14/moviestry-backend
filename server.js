const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(
  cors({ origin: [process.env.FRONTEND_URI, process.env.LIVE_FRONTEND_URI] })
);

const connectDb = require("./utils/connectDb");
connectDb();

const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const statsRoutes = require("./routes/statsRoutes");

const PORT = process.env.PORT || 8002;

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => res.send("Moviestry"));

app.use("/api/v1", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/media", movieRoutes);
app.use("/api/v1/user-stats", statsRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
