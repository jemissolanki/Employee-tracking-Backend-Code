const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/database.config.js");
const authRoutes = require("./routes/auth.route.js");
const employeeRoute=require("./routes/employee.route.js");
const app = express();

dotenv.config();
connectDB();
// middleware
app.use(bodyParser.json());
//  routes
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoute);

// error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   return res.status(500).send("invalid server error");
// });

const PORT = 5674;
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
