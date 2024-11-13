const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    
    employeeClass: String!
    subjects: [String]!
    attendance: Float!
  }

  type Query {
    employees(page: Int, size: Int, sortBy: String): [Employee]
    employeeById(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, employeeClass: String!, subjects: [String], attendance: Float!): Employee
    updateEmployee(id: ID!, name: String, age: Int, employeeClass: String, subjects: [String], attendance: Float): Employee
  }
`;

module.exports = typeDefs;
