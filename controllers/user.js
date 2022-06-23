import bcrypt from 'bcrypt'
import passport from 'passport'
import LocalStrategy from 'passport-local'

import database from './database.js'
import userModel from '../models/user.js'
import codeModel from '../models/code.js'

const authUser = () => {
    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    },
    async function(req, username, password, done) {
        const foundUser = await userModel.findOne({where: {username: username, classID: req.body.classID}})
        if (foundUser) {
            const comparePassword = await bcrypt.compare(password, foundUser.password)
            if (!comparePassword) {return done(null, false, {type: 'login-message', message: 'Hibás felhasználónév vagy jelszó!'})}
            return done(null, foundUser);
        } else {
            return done(null, false, {type: 'login-message', message: 'Hibás felhasználónév vagy jelszó!'})
        }
    }))
}

const userLogin = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
})

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        req.flash('login-message', 'Először be kell jelentkezned!')
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

passport.serializeUser((user, done) => {
    done(null, user);
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

const userRegister = async (req, res) => {
    const {username, password1, password2, email, code, classID} = req.body;

    if (password1 !== password2) {
        req.flash('register-message', 'A két jelszó nem egyezik!')
        res.redirect('/register')
        return
    }

    const existUsername = await userModel.findOne({where: {username: username}})
    if (existUsername) {
        req.flash('register-message', 'Ez a felhasználónév már létezik!')
        res.redirect('/register')
        return
    }

    const existEmail = await userModel.findOne({where: {emailAddress: email}})
    if (existEmail) {
        req.flash('register-message', 'Ez az e-mail cím már létezik!')
        res.redirect('/register')
        return
    }

    const existCode = await codeModel.findOne({where: {code: code}})
    if (!existCode) {
        req.flash('register-message', 'A regisztrációs kód hibás!')
        res.redirect('/register')
        return
    }

    const hashedPassword = await bcrypt.hash(password1, 10)
    userModel.create({
        username: username,
        password: hashedPassword,
        emailAddress: email,
        classID: classID,
        registrationDate: database.literal('CURRENT_TIMESTAMP')
    })
    .then(() => {
        existCode.destroy()
        req.flash('login-message', 'Sikeres regisztráció!')
        res.redirect('/login')
        return
    })
}

const updateUser = async (req, res, next) => {
    const {fullname} = req.body
    console.log(req.user);
    const user = await userModel.findOne({where: { id: req.user.id }})
    const update = {name: fullname}
    await user.updateOne(update)
    .then(() => {
        req.flash('account-message2', 'Az adatok frissítése sikeres!')
        res.redirect('/account')
    })
}

const logoutUser = async (req, res) => {
    req.session.destroy()
    req.logout()
    res.redirect('/login')
}

const countClassMembersByClassID = async (id) => {
    const count = await userModel.count({where: {classID: id}});
    return count;
}

export {userLogin, userRegister, updateUser, logoutUser, authUser, isLoggedIn, isNotLoggedIn, countClassMembersByClassID}