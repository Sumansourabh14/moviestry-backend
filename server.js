const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const connectDb = require("./utils/connectDb");
connectDb();

const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 8002;

app.use(express.json());

app.get("/", (req, res) => res.send("Moviestry"));

app.use("/api/v1", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
