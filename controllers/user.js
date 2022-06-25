import bcrypt from 'bcrypt'
import passport from 'passport'
import LocalStrategy from 'passport-local'

import database from './database.js'
import userModel from '../models/user.js'
import codeModel from '../models/code.js'

import {isAdmin, getClassList, getClassById} from '../controllers/class.js'

const authUser = () => {
    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    },
    async function(req, username, password, done) {
        const foundUser = await userModel.findOne({where: {username: username, classID: req.body.classID}})
        if (foundUser) {
            const comparePassword = await bcrypt.compare(password, foundUser.password)
            if (!comparePassword) {return done(null, false, {type: 'loginMessages', message: 'Hibás felhasználónév vagy jelszó!'})}
            if (foundUser.suspended) {
                return done(null, false, {type: 'loginMessages', message: 'A fiókod zárolva van! Vedd fel a kapcsolatot az osztályadminnal!'})
            }
            return done(null, foundUser);
        } else {
            return done(null, false, {type: 'loginMessages', message: 'Hibás felhasználónév vagy jelszó!'})
        }
    }))
}

const userLogin = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
})

const userRegister = async (req, res) => {
    const {username, password1, password2, email, code, classID} = req.body;

    if (password1 !== password2) {
        req.flash('loginMessages', 'A két jelszó nem egyezik!')
        res.redirect('/register')
        return
    }

    const existUsername = await userModel.findOne({where: {username: username}})
    if (existUsername) {
        req.flash('loginMessages', 'Ez a felhasználónév már létezik!')
        res.redirect('/register')
        return
    }

    const existEmail = await userModel.findOne({where: {emailAddress: email}})
    if (existEmail) {
        req.flash('loginMessages', 'Ez az e-mail cím már létezik!')
        res.redirect('/register')
        return
    }

    const existCode = await codeModel.findOne({where: {code: code}})
    if (!existCode) {
        req.flash('loginMessages', 'A regisztrációs kód hibás!')
        res.redirect('/register')
        return
    }

    const hashedPassword = await bcrypt.hash(password1, 10)
    userModel.create({
        username: username,
        password: hashedPassword,
        emailAddress: email,
        classID: classID,
    })
    .then(() => {
        existCode.destroy()
        req.flash('loginMessages', 'Sikeres regisztráció!')
        res.redirect('/login')
        return
    })
}

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/')
    }
}

const logoutUser = async (req, res) => {
    req.session.destroy()
    req.logout()
    res.redirect('/login')
}

passport.serializeUser((user, done) => {
    done(null, user);
});
  
passport.deserializeUser(async (user, done) => {
    // Add the class and admin informations to the user object
    const classList = JSON.parse(await getClassList())
    user.class = getClassById(classList, user.classID)
    user.isAdmin = isAdmin(user.class, user.id)
    done(null, user);
});


const countClassMembersByClassID = async (id) => {
    const count = await userModel.count({where: {classID: id}});
    return count;
}

const isUserAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next()
    } else {
        req.flash('message', 'Erre nincs jogosultságod!')
        res.redirect('/')
    }
}

const updateColor = async (req, res, next) => {
    const color = req.body.color
    const update = await userModel.update({color: color}, {where: {id: req.user.id}});
    if (update) {
        req.user.color = color
        req.flash('message', 'Sikeresen beállítottad a színt!')
        res.redirect('/account')
    }
}

const getAllUserByClassID = async (classid) => {
    const list = await userModel.findAll({where: {classID: classid}});
	return JSON.stringify(list);
}

const getUserByID = async (id) => {
    const list = await userModel.findOne({where: {id: id}});
	return JSON.stringify(list);
}

export {
    userLogin, 
    userRegister, 
    logoutUser, 
    authUser, 
    isLoggedIn, 
    isNotLoggedIn, 
    countClassMembersByClassID, 
    updateColor, 
    isUserAdmin,
    getAllUserByClassID,
    getUserByID
}