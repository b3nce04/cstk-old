import {QueryTypes} from 'sequelize'
import database from "./database.js";

const getMessages = async (classID) => {
	const messages = await database.query(`SELECT text FROM messages WHERE classID = ${classID}`, {type: QueryTypes.SELECT});
	return messages;
};


export {getMessages};