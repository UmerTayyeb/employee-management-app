const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema'); // Use your original schema

// const testTypeDefs = require('./test_schema'); // Use the minimal schema
const resolvers = {}; // No resolvers needed for this test

const app = express();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  mongoose.connect('mongodb://localhost:27017/employee-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(4000, () => {
      console.log('Server is running at http://localhost:4000/graphql');
    });
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err);
  });
};

startServer();

// const express = require('express');
// const { ApolloServer, gql } = require('apollo-server-express');
// const mongoose = require('mongoose');
// const testTypeDefs = require('./test_schema'); // Use the minimal schema

// const User = require('./models/User'); // your model

// // Define your schema
// const typeDefs = gql`
//   type User {
//     id: ID!
//     name: String!
//     email: String!
//     role: String!
//   }

//   type Query {
//     users: [User]
//   }
// `;

// const resolvers = {
//   Query: {
//     users: async () => {
//       return await User.find();
//     }
//   }
// };

// const app = express();

// // Create an instance of ApolloServer
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req, res }) => ({ req, res }) // Pass req and res to context
// });

// // Start Apollo Server before applying middleware
// const startServer = async () => {
//   await server.start(); // Await ApolloServer start
//   server.applyMiddleware({ app }); // Apply middleware after the server starts

//   // Connect to MongoDB
//   mongoose.connect('mongodb://localhost:27017/employee-management', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Start the express server
//     app.listen(4000, () => {
//       console.log('Server is running at http://localhost:4000/graphql');
//     });
//   })
//   .catch(err => {
//     console.log('Error connecting to MongoDB', err);
//   });
// };

// startServer();
// app.use((req, res, next) => {
//     console.log(`API request received: ${req.method} ${req.url}`);
//     next(); // Pass control to the next middleware
// });

// // const express = require('express');
// // const { ApolloServer, gql } = require('apollo-server-express');
// // const mongoose = require('mongoose');
// // const User = require('./models/User'); // your model

// // // Define your schema
// // const typeDefs = gql`
// //   type User {
// //     id: ID!
// //     name: String!
// //     email: String!
// //     role: String!
// //   }

// //   type Query {
// //     users: [User]
// //   }
// // `;

// // const resolvers = {
// //   Query: {
// //     users: async () => {
// //       return await User.find();
// //     }
// //   }
// // };

// // const app = express();

// // // Create an instance of ApolloServer
// // const server = new ApolloServer({
// //   typeDefs,
// //   resolvers
// // });

// // // Start Apollo Server before applying middleware
// // const startServer = async () => {
// //   await server.start(); // Await ApolloServer start
// //   server.applyMiddleware({ app }); // Apply middleware after the server starts

// //   // Connect to MongoDB
// //   mongoose.connect('mongodb://localhost:27017/employee-management', {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// //   })
// //   .then(() => {
// //     console.log('Connected to MongoDB');
// //     // Start the express server
// //     app.listen(4000, () => {
// //       console.log('Server is running at http://localhost:4000/graphql');
// //     });
// //   })
// //   .catch(err => {
// //     console.log('Error connecting to MongoDB', err);
// //   });
// // };

// // startServer();
// // app.use((req, res, next) => {
// //     console.log(`API request received: ${req.method} ${req.url}`);
// //     next(); // Pass control to the next middleware
// //   });

// // // const express = require('express');
// // // const { ApolloServer } = require('apollo-server-express');
// // // const mongoose = require('mongoose');
// // // require('dotenv').config();

// // // const app = express();

// // // // Connect to MongoDB
// // // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// // //   .then(() => console.log('MongoDB connected'))
// // //   .catch((err) => console.log(err));

// // // // Set up Apollo Server
// // // const server = new ApolloServer({
// // //   typeDefs: require('./schema'),  // Import the GraphQL schema
// // //   resolvers: require('./resolvers'), // Import resolvers
// // // });

// // // server.applyMiddleware({ app });

// // // app.listen(4000, () => {
// // //   console.log('Server is running at http://localhost:4000/graphql');
// // // });
