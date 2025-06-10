const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee.controller.js");
const { protect } = require("../middleware/auth.middleware.js");

const router = express.Router();

router.route("/").post(protect,createEmployee);
router.route("/").get(getAllEmployees);
router.route("/:id").put(protect,updateEmployee);
router.route("/:id").delete(protect,deleteEmployee);


module.exports=router;