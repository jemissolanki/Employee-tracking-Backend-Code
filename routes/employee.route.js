const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee.controller.js");
const { protect } = require("../middleware/auth.middleware.js");
const router = express.Router();

router.route("/").post(protect,createEmployee).get(getAllEmployees);
router.route("/:ID").put(protect,updateEmployee).delete(protect,deleteEmployee);


module.exports=router;