const express = require("express");
const app = express();

const morgan = require("morgan");
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const { ApolloServer, gql } = require('apollo-server-express');
const SimplyRETSAPI = require('./datasource')
const fs = require('fs')
const typeDefs = gql(fs.readFileSync('./schema.graphql', {encoding: 'utf8'}))
const resolvers = require('./resolvers')

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ simplyRETSAPI: new SimplyRETSAPI() }),
})

apolloServer.applyMiddleware({app, path: '/graphql'})

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;