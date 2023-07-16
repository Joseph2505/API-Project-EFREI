const express = require('express');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const {ApolloServer} = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers");

const credentials = require('./credentials.json');

const port = 3000;

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground:true
});

server.start().then(() => {
    mongoose.connect("mongodb+srv://clara22:Mangue22@usersdatabase.xkyclln.mongodb.net/")
    .then(()=>{
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    })
});


  
