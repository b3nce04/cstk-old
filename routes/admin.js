import express from "express";

import {getAllUserByClassID, getUserByID, isUserAdmin} from '../controllers/user.js'
import { getAllGroupsByClassID } from "../controllers/group.js";


const router = express.Router();

router.get("/", async (req, res) => {
	res.render('pages/admin/admin', {
		studentsTable: JSON.parse(await getAllUserByClassID(req.user.classID)),
		groupsTable: JSON.parse(await getAllGroupsByClassID(req.user.classID))
	})
});

router.get("/edit/user/:id", isUserAdmin, async (req, res) => {
	if (req.params.id) {
		res.render('pages/admin/edit-user', {
			userDatas: JSON.parse(await getUserByID(req.params.id)),
		})
	} else {
		res.redirect('/')
	}
});

export default router;
