const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	message: String,
	timestamp: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Chat", ChatSchema);