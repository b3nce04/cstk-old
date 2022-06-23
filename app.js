import "dotenv/config";
import express from "express";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import NodeCache from "node-cache";

import database from "./controllers/database.js";
import { authUser, isLoggedIn, isNotLoggedIn } from "./controllers/user.js";
import { getClassList, getClassNameById } from "./controllers/class.js";

import userRoutes from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 3000;
const ServerCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

await database
	.authenticate()
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`Az alkalmazás elindult, elérhető itt: http://localhost:${PORT}`
			);
		});
	})
	.catch((err) => {
		console.log(`Hiba történt: ${err}`);
	});

ServerCache.set("classList", await getClassList());

app.set("view engine", "pug");
app.set("views", "views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: true,
		resave: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

authUser();

// Routes
app.use("/user", userRoutes);

app.get("/", (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect("/main");
	} else {
		res.redirect("/login");
	}
});

app.use(async (req, res, next) => {
	res.locals.VERSION = process.env.npm_package_version;
	res.locals.classList = ServerCache.get("classList");
	next();
});

app.get("/login", isNotLoggedIn, (req, res) => {
	res.render("login", { message: req.flash("login-message") });
});

app.get("/register", isNotLoggedIn, (req, res) => {
	res.render("register", { message: req.flash("register-message") });
});

app.use(isLoggedIn, async (req, res, next) => {
	res.locals.user = req.user;
	res.locals.sessionID = req.sessionID;
	res.locals.className = await getClassNameById(req.user.classID);
	next();
});

app.get("/main", isLoggedIn, (req, res) => {
	res.render("main");
});

app.get("/myaccount", isLoggedIn, (req, res) => {
	res.render("account", {
		pictureMessage: req.flash("account-message1"),
		detailsMessage: req.flash("account-message2"),
	});
});

app.get("/classes", isLoggedIn, (req, res) => {
	res.render("classes", {});
});

// Error page
app.use((req, res, next) => {
	res.render("404");
});
