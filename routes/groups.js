import express from "express";

import { getAllGroupsByClassID } from "../controllers/group.js";

const router = express.Router();

router.get("/", async (req, res) => {
	res.render("pages/groups", {
		groupList: await getAllGroupsByClassID(req.user.classID),
	});
});

export default router;
