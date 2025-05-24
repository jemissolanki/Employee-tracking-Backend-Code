const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      require: true,
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
      type: mongoose.Schema.types.objectId,
      ref: "Users",
      require: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  { tyimestamps: true }
);

module.exports = mongoose.model("employee", employeeSchema);
