import "dotenv/config";
import express from "express";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";

import database from "./controllers/database.js";
import { isLoggedIn, isUserAdmin, authUser } from "./controllers/user.js";
import { getClassList } from "./controllers/class.js";

import requestRoutes from "./routes/api-requests.js";
import mainRoutes from "./routes/main.js";
import groupsRoutes from "./routes/groups.js";
import adminRoutes from './routes/admin.js'

const app = express();
const PORT = process.env.PORT || 3000;

await database
	.authenticate()
	.then(() => {
		app.listen(PORT, async () => {
			console.log(
				`Az alkalmazás elindult, elérhető itt: http://localhost:${PORT}`
			);
		});
	})
	.catch((err) => {
		console.log(`Hiba történt: ${err}`);
	});

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

// POST & GET requests
app.use("/api", requestRoutes);

// Middleware for all
app.use(async (req, res, next) => {
	res.locals.VERSION = process.env.npm_package_version;
	if (!req.isAuthenticated()) {
		res.locals.classList = JSON.parse(await getClassList())
		res.locals.message = req.flash("loginMessages")
	} else {
		res.locals.user = req.user
		res.locals.sessionID = req.sessionID
		res.locals.globalInformations = process.env.GLOBAL_INFORMATIONS.split('|')
		res.locals.message = req.flash('message')
	}
	next();
});

// Routes
app.use("/", mainRoutes);
app.use("/groups", isLoggedIn, groupsRoutes);

app.use("/admin", isLoggedIn, isUserAdmin, adminRoutes);

// Error page
app.use((req, res, next) => {
	res.render("404");
});