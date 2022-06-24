import express from "express";

import { getAllGroupsByClassID, getGroupById } from "../controllers/group.js";

const router = express.Router();

const isAdmin = (req, res, next) => {
	if (res.locals.isAdmin) {
		next()
	} else {
		req.flash('message', 'Nincs ehhez jogosultságod, mivel nem vagy osztályadmin!');
		res.redirect('/groups')
	}
}

router.get("/", async (req, res) => {
	const groupList = JSON.parse(await getAllGroupsByClassID(req.user.classID))
	if (req.query.id) {
		res.render("pages/groups/main", {
			group: getGroupById(groupList, req.query.id)
		});
	} else {
		res.render("pages/groups/list", {
			groupList: groupList,
		});
	}
});

router.get("/create", isAdmin, (req, res) => {
	res.render("pages/groups/create");
});

export default router;
