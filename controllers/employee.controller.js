const employee = require("../models/Employee.model.js");
const fs = require("fs");
const path = require("path");

exports.createEmployee = async (req, res) => {
  try {
    const { employeeName, workDesignation, qualification } = req.body;
    const userId = usersModel._id;
    const newEmployee = new employee({
      employeeName,
      workDesignation,
      qualification,
      author: userId,
      createAt: new Date(),
    });
    await this.createEmployee.save();
    return res
      .status(201)
      .json({ message: "employee created", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: "server error " });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employee.find().populate("author", "username");
    return res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "server error " });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const userId = req.users._id;
    const employeeId = req.params.id;
    const employee = await employees.findById(userId);
    if (!employee)
      return res.status(404).json({ message: "Employee Not Found " });
    if (employee.author.toString !== userId.toString())
      return res.status(403).json({ message: "Unauthorized " });

    employee.employeeName = req.employee.employeeName || employee.employeeName;
    employee.workDesignation =
      req.employee.workDesignation || employee.workDesignation;
    await updateEmployee.save();
    return res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "server error " });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const userId = req.users._id;
    const employeeId = req.params.id;
    const employee = await employees.findById(userId);
    if (!employee)
      return res.status(404).json({ message: "Employee Not Found " });
    if (employee.author.toString !== userId.toString())
      return res.status(403).json({ message: "Unauthorized " });

    await deleteEmployee.save();
    return res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "server error " });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
