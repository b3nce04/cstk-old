import express from "express";

import { getAllGroupsByClassID, getGroupById } from "../controllers/group.js";

import {isUserAdmin} from '../controllers/user.js';

const router = express.Router();

router.get("/", async (req, res) => {
	const groupList = JSON.parse(await getAllGroupsByClassID(req.user.classID))
	if (req.query.id) {
		res.render("pages/groups/main", {
			group: getGroupById(groupList, parseInt(req.query.id))
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
