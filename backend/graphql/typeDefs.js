const { gql } = require("apollo-server-express");
const { GraphQLDateTime } = require("graphql-scalars");

const typeDefs = gql`
	scalar DateTime

	type User {
		id: ID!
		firstname: String!
		name: String!
		email: String!
	}

	type Chat {
		id: ID!
		sender: User!
		message: String!
		timestamp: DateTime!
	}

	type Query {
		getUsers: [User!]!
		getChats: [Chat!]!
	}

	type Mutation {
		createUser(firstname: String!, name: String!, email: String!): User!
		createChat(sender: ID!, message: String!): Chat!
	}

	type Subscription {
		newChat: Chat!
	}
	`;

module.exports = typeDefs;
