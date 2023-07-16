const User = require("../models/User");
const Chat = require("../models/Chat");

module.exports = {
	Query: {
		getUsers: async () => {
		try {
			const users = await User.find();
			return users;
		} catch (error) {
			throw new Error("Failed to fetch users.");
		}
		},
		getChats: async () => {
		try {
			const chats = await Chat.find().populate("sender");
			return chats;
		} catch (error) {
			throw new Error("Failed to fetch chats.");
		}
		},
	},
	Mutation: {
		createUser: async (_, { firstname, name, email }) => {
		try {
			const user = await User.create({ firstname, name, email });
			return user.toObject();
		} catch (error) {
			throw new Error("Failed to create a new user.");
		}
		},
		createChat: async (_, { sender, message }) => {
		try {
			const chat = await Chat.create({ sender, message });
			return chat.toObject();
		} catch (error) {
			throw new Error("Failed to create a new chat.");
		}
		},
	},
	Subscription: {
		newChat: {
		subscribe: (parent, args, { pubsub }) => {
			return pubsub.asyncIterator("NEW_CHAT");
		},
		},
	},
};
