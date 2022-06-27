import database from "../controllers/database.js";
import { DataTypes } from "sequelize";

const Code = database.define("Code", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	code: {
		type: DataTypes.STRING(8),
	},
});

Code.sync();

// function makeid(length) {
// 	var result = "";
// 	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// 	var charactersLength = characters.length;
// 	for (var i = 0; i < length; i++) {
// 		result += characters.charAt(
// 			Math.floor(Math.random() * charactersLength)
// 		);
// 	}
// 	return result;
// }

// for (let index = 0; index < 50; index++) {
// 	const code = await Code.create({ code: makeid(8) });
// }

export default Code;