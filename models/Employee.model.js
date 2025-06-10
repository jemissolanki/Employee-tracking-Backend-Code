const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },
    workDesignation: {
      type: String,
      require: true,
    },
    qualification: {
      type: String,
      require: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
