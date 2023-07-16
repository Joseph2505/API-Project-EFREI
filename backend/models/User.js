const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	firstname: String,
	name: String,
	email: String,
});

module.exports = mongoose.model("User", UserSchema);