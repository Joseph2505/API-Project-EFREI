const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
		timestamp: String!
	}

	type Query {
		getUsers: [User!]!
		getChats: [Chat!]!
	}

	type Mutation {
		createUser(name: String!, email: String!): User!
		createChat(sender: ID!, message: String!): Chat!
	}

	type Subscription {
		newChat: Chat!
	}
	`;

module.exports = typeDefs;
