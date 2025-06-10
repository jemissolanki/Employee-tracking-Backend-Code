const Employee = require("../models/Employee.model.js");
const fs = require("fs");
const path = require("path");

const createEmployee = async (req, res) => {
  try {
    const { employeeName, workDesignation, qualification } = req.body;
    const userId = req.user._id;

    const newEmployee = new Employee({
      employeeName,
      workDesignation,
      qualification,
      author: userId,
    });
    await newEmployee.save();
    return res
      .status(201)
      .json({ message: "employee created", employee: newEmployee });
  } catch (error) {
    console.error("create employee error", error);
    
    res.status(500).json({ message: "server error " });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("author", "username");
    return res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "server error " });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const userId = req.user._id;
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    if (!employee)
      return res.status(404).json({ message: "Employee Not Found " });
    if (employee.author.toString() !== userId.toString())
      return res.status(403).json({ message: "Unauthorized " });

    employee.employeeName = req.body.employeeName || employee.employeeName;
    employee.workDesignation =
      req.body.workDesignation || employee.workDesignation;
      employee.qualification=req.body.qualification || employee.qualification;
    await employee.save();
    return res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "server error " });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const userId = req.user._id;
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    if (!employee)
      return res.status(404).json({ message: "Employee Not Found " });
    if (employee.author.toString() !== userId.toString())
      return res.status(403).json({ message: "Unauthorized " });

    await employee.deleteOne();
    return res.status(200).json({message:"employee deleted"});
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
