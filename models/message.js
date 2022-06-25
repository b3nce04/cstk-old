import database from "../controllers/database.js";
import { DataTypes } from "sequelize";

import User from "./user.js";
import Group from "./group.js";

const Message = database.define("Message", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	text: {
		type: DataTypes.TEXT,
	},
	date: {
		type: DataTypes.DATE,
		defaultValue: database.fn("NOW"),
	},
});

Message.belongsTo(User, {
	foreignKey: "userID",
});
Message.belongsTo(Group, {
	foreignKey: "groupID",
});

Message.sync();

export default Message;
