import express from 'express'

const router = express.Router()

import { isLoggedIn, isNotLoggedIn, countClassMembersByClassID } from "../controllers/user.js";
import { getInformations } from "../controllers/informations.js";

router.get('/', isLoggedIn, async (req, res, next) => {
	const user = req.user
	const userInformations = []
	if (!user.fullName) {
		userInformations.push("Nincs megadva a teljes neved. Kérd meg az osztályadmint, hogy tegye ezt meg!")
	}
	if (!user.birthDate) {
		userInformations.push("Nincs megadva a születési dátumod. Kérd meg az osztályadmint, hogy tegye ezt meg!")
	}
	res.render('pages/index', {
		classMembers: await countClassMembersByClassID(user.classID),
		classInformations: JSON.parse(await getInformations(user.classID)),
		userInformations: userInformations
	});
})

router.get("/login", isNotLoggedIn, (req, res) => {
	res.render("login");
});

router.get("/register", isNotLoggedIn, (req, res) => {
	res.render("register");
});

router.get("/account", isLoggedIn, (req, res) => {
	res.render("pages/account");
});

export default router