const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const indexRouter = require("./route/index.js");

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.use("/api", indexRouter);

app.listen(process.env.PORT || 5000);
