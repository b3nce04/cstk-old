import express from 'express'

const router = express.Router()

import { isLoggedIn, isNotLoggedIn, countClassMembersByClassID } from "../controllers/user.js";
import { getMessages } from "../controllers/messages.js";

router.get('/', isLoggedIn, async (req, res, next) => {
	const user = req.user
	const userMessages = []
	if (!user.fullName) {
		userMessages.push("Nincs megadva a teljes neved. Kérd meg az osztályadmint, hogy tegye ezt meg!")
	}
	if (!user.birthDate) {
		userMessages.push("Nincs megadva a születési dátumod. Kérd meg az osztályadmint, hogy tegye ezt meg!")
	}
	res.render('pages/index', {
		classMembers: await countClassMembersByClassID(user.classID),
		classMessages: JSON.parse(await getMessages(user.classID)),
		userMessages: userMessages
	});
})

router.get("/login", isNotLoggedIn, (req, res) => {
	res.render("login", { message: req.flash("login-message") });
});

router.get("/register", isNotLoggedIn, (req, res) => {
	res.render("register", { message: req.flash("register-message") });
});

router.get("/account", isLoggedIn, (req, res) => {
	res.render("pages/account");
});

export default router