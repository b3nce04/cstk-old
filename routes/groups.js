import express from "express";

import {
	getAllGroupsByClassID,
	getGroupById,
	getGroupMessagesByID,
} from "../controllers/group.js";

import { isUserAdmin } from "../controllers/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const groupList = JSON.parse(await getAllGroupsByClassID(req.user.classID));
	if (req.query.id) {
		const group = getGroupById(groupList, parseInt(req.query.id));
		const messages = await getGroupMessagesByID(group.id);
		res.render("pages/groups/main", {
			group: group,
			messages: messages,
		});
	} else {
		res.render("pages/groups/list", {
			groupList: groupList,
		});
	}
});

router.get("/create", isUserAdmin, (req, res) => {
	res.render("pages/groups/create");
});

export default router;
