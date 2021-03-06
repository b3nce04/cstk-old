import groupModel from "../models/group.js";

import { getMessagesByGroupID, insertMessage } from "./message.js";

import { getUserByID } from "./user.js";

const getAllGroupsByClassID = async (id) => {
	const list = await groupModel.findAll({ where: { classID: id } });
	return JSON.stringify(list);
};

const getGroupById = (list, groupid) => {
	return list.find((element) => element.id == groupid);
};

const createGroup = async (req, res, next) => {
	const { name, isOpen } = req.body;
	if (name.length < 3) {
		req.flash(
			"message",
			"A névnek legalább 3 karakter hosszúnak kell lennie."
		);
		res.redirect("/groups/create");
		return;
	}
	const newGroup = await groupModel.create({
		classID: req.user.classID,
		name: name,
		isOpen: isOpen === "on",
	});
	if (newGroup) {
		req.flash("message", "Sikeresen létrehoztad a csoportot!");
		res.redirect("/groups");
	}
};

const changeState = async (req, res, next) => {
	const searched = await groupModel.findOne({where: {id: req.params.id}})
    if (searched) {
        const update = await groupModel.update({isOpen: !searched.isOpen}, {where: {id: req.params.id}});
        if (update) {
            req.flash('message', 'Sikeresen megváltoztattad a csoport állapotát!')
            res.redirect(`/groups`)
        }
    }
};

const getGroupMessagesByID = async (id) => {
	return Promise.all(
		JSON.parse(await getMessagesByGroupID(id)).map(async (item) => {
			const senderUser = JSON.parse(await getUserByID(item.userID));
			item.senderName = senderUser.fullName || senderUser.username;
            item.senderColor = senderUser.color;
			return item;
		})
	);
};

const sendMessage = async (req, res, next) => {
    const allGroups = JSON.parse(await getAllGroupsByClassID(req.user.classID))
	const isGroupOpen = getGroupById(allGroups, req.params.id).isOpen
    if (isGroupOpen) {
        const newMessage = await insertMessage(
    		req.user.id,
    		req.params.id,
    		req.body.message
    	);
    }
	res.redirect(`/groups?id=${req.params.id}`);
};

export {
	getAllGroupsByClassID,
	getGroupById,
	createGroup,
	changeState,
	sendMessage,
	getGroupMessagesByID,
};
