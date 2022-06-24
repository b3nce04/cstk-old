import "dotenv/config";
import express from "express";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import NodeCache from "node-cache";

import database from "./controllers/database.js";
import { isLoggedIn, authUser } from "./controllers/user.js";
import { getClassList, getClassById, isAdmin } from "./controllers/class.js";
import { getMessages } from "./controllers/messages.js";

import requestRoutes from "./routes/api-requests.js";
import mainRoutes from "./routes/main.js";
import groupsRoutes from "./routes/groups.js";

const app = express();
const PORT = process.env.PORT || 3000;
const ServerCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

await database
	.authenticate()
	.then(() => {
		app.listen(PORT, async () => {
			console.log(
				`Az alkalmazás elindult, elérhető itt: http://localhost:${PORT}`
			);
			// Setup server cache
			ServerCache.set("classList", JSON.parse(await getClassList()));
			ServerCache.set("globalMessages", JSON.parse(await getMessages(0)));
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
app.use((req, res, next) => {
	const classList = ServerCache.get("classList");
	res.locals.VERSION = process.env.npm_package_version;
	res.locals.classList = classList;
	if (req.isAuthenticated()) {
		const user = req.user
		res.locals.user = user
		res.locals.message = req.flash('message') // Itt üzenünk a felhasználónak
		res.locals.sessionID = req.sessionID
		res.locals.userClass = getClassById(classList, user.classID)
		res.locals.isAdmin = isAdmin(res.locals.userClass, user.id)
		res.locals.globalMessages = ServerCache.get("globalMessages")
	}
	next();
});

app.use((req, res, next) => {
	console.log('-------------');
	console.log(res.locals);
	console.log('-------------');
	next()
})

// Routes
app.use("/", mainRoutes);
app.use("/groups", isLoggedIn, groupsRoutes);

app.use("/admin", isLoggedIn, isAdmin, groupsRoutes);

// Error page
app.use((req, res, next) => {
	res.render("404");
});