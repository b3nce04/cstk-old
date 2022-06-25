import express from "express";

import {getAllUserByClassID} from '../controllers/user.js'
import { getAllGroupsByClassID } from "../controllers/group.js";


const router = express.Router();

router.get("/", async (req, res) => {
	res.render('pages/admin', {
		studentsTable: JSON.parse(await getAllUserByClassID(req.user.classID)),
		groupsTable: JSON.parse(await getAllGroupsByClassID(req.user.classID))
	})
});
export default router;
