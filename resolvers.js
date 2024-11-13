const { authenticate } = require('./auth');
const Employee = require('./models/Employee'); // Your Employee model

const resolvers = {
  Query: {
    // Protect the 'employees' query by requiring 'admin' role
    employees: async (_, { page = 0, size = 5, sortBy = 'name' }, context) => {
      authenticate('admin')(context.req, context.res, () => {}); // Check for admin role

      // Perform the query
      return await Employee.find()
        .skip(page * size)
        .limit(size)
        .sort(sortBy);
    },
    
    // Protect the 'employeeById' query by requiring 'employee' or 'admin' role
    employeeById: async (_, { id }, context) => {
      authenticate('employee')(context.req, context.res, () => {}); // Check for employee role

      // Fetch employee by ID
      return await Employee.findById(id);
    },
  },

  Mutation: {
    // Protect the 'addEmployee' mutation by requiring 'admin' role
    addEmployee: async (_, { name,employeeClass, subjects, attendance }, context) => {
      authenticate('admin')(context.req, context.res, () => {}); // Check for admin role

      const newEmployee = new Employee({ name, age, employeeClass, subjects, attendance });
      return await newEmployee.save();
    },
    
    // Protect the 'updateEmployee' mutation by requiring 'admin' role
    updateEmployee: async (_, { id, name, age, employeeClass, subjects, attendance }, context) => {
      authenticate('admin')(context.req, context.res, () => {}); // Check for admin role

      const employee = await Employee.findById(id);
      if (!employee) throw new Error('Employee not found');

      if (name) employee.name = name;
      if (age) employee.age = age;
      if (employeeClass) employee.employeeClass = employeeClass;
      if (subjects) employee.subjects = subjects;
      if (attendance) employee.attendance = attendance;

      return await employee.save();
    },
  },
};

module.exports = resolvers;

// // resolvers.js
// const { authenticate } = require('./auth');
// const Employee = require('./models/Employee'); // Your Employee model

// const resolvers = {
//   Query: {
//     // Protect the 'employees' query by requiring authentication
//     employees: async (_, { page = 0, size = 5, sortBy = 'name' }, context) => {
//       // Check if user is authenticated
//       await authenticate(context); // Will throw error if authentication fails

//       // Perform the query
//       return await Employee.find()
//         .skip(page * size)
//         .limit(size)
//         .sort(sortBy);
//     },
    
//     // Protect the 'employeeById' query by requiring authentication
//     employeeById: async (_, { id }, context) => {
//       await authenticate(context); // Will throw error if authentication fails

//       // Fetch employee by ID
//       return await Employee.findById(id);
//     },
//   },

//   Mutation: {
//     // Protect the 'addEmployee' mutation by requiring authentication
//     addEmployee: async (_, { name, age, employeeClass, subjects, attendance }, context) => {
//       await authenticate(context); // Will throw error if authentication fails

//       const newEmployee = new Employee({ name, age, employeeClass, subjects, attendance });
//       return await newEmployee.save();
//     },
    
//     // Protect the 'updateEmployee' mutation by requiring authentication
//     updateEmployee: async (_, { id, name, age, employeeClass, subjects, attendance }, context) => {
//       await authenticate(context); // Will throw error if authentication fails

//       const employee = await Employee.findById(id);
//       if (!employee) throw new Error('Employee not found');

//       if (name) employee.name = name;
//       if (age) employee.age = age;
//       if (employeeClass) employee.employeeClass = employeeClass;
//       if (subjects) employee.subjects = subjects;
//       if (attendance) employee.attendance = attendance;

//       return await employee.save();
//     },
//   },
// };

// module.exports = resolvers;
