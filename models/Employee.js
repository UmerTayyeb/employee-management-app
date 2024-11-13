const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeClass: { type: String, required: true },
  subjects: [String],
  attendance: { type: Number, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;