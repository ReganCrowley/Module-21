const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { resolvers, typeDefs } = require('./apollo');
const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/connection');
//const routes = require('./routes');

// https://www.npmjs.com/package/@apollo/server

// (async () => {
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

// const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
//await server.start();

// app.use(cors(), bodyParser.json(), expressMiddleware(server));

// db.once('open', async () => {
//   await new Promise((resolve) => {
//     httpServer.listen({ port: PORT }, resolve);
//     console.log(`🌍 Now listening on localhost:${PORT}`);
//   });
// });
// })();

// (async () => {

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   // Create a new instance of an Apollo server with the GraphQL schema
//   await server.start();
//   server.applyMiddleware({ app });

//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running at http://localhost:${PORT}!`);
//       console.log(
//         `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
//       );
//     });
//   });
// })();

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  //server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer();