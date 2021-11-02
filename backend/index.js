const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./database");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const profileRoute = require("./routes/profile");
const authRoute = require("./routes/auth");


const app = express();
dotenv.config({ path: "./config.env" });
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);


app.listen("8000", () => console.log("Started server on port: 8000"))