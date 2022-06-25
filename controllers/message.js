import messageModel from '../models/message.js'

const getMessagesByGroupID = async (groupId) => {
    const messages = await messageModel.findAll({where: {groupID: groupId}})
	return JSON.stringify(messages);
}

const insertMessage = async (userId, groupId, text) => {
    const inserted = await messageModel.create({
        userID: userId,
        groupID: groupId,
        text: text
    })
	return inserted
}

export {getMessagesByGroupID, insertMessage}