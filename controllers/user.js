import bcrypt from 'bcrypt'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import userModel from '../models/user.js'
import codeModel from '../models/code.js'

const authUser = () => {
    passport.use(new LocalStrategy((username, password, done) => {
        userModel.findOne({username: username}, async (err, user) => {
            if (err) {return done(err)}
            if (!user) {return done(null, false, {type: 'message', message: 'Hibás felhasználónév vagy jelszó!'})}
            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) {return done(null, false, {type: 'message', message: 'Hibás felhasználónév vagy jelszó!'})}
            return done(null, user);
        })
    }))
}

const userLogin = passport.authenticate('local', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash : true
})

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        req.flash('message', 'Először be kell jelentkezned!')
        res.redirect('/')
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
    const {username, password1, password2, email, code, className} = req.body;

    if (password1 !== password2) {
        req.flash('message', 'A két jelszó nem egyezik!')
        res.redirect('/register')
        return
    }

    const existUsername = await userModel.findOne({username: username})
    if (existUsername) {
        req.flash('message', 'Ez a felhasználónév már létezik!')
        res.redirect('/register')
        return
    }

    const existEmail = await userModel.findOne({email: email})
    if (existEmail) {
        req.flash('message', 'Ez az e-mail cím már létezik!')
        res.redirect('/register')
        return
    }

    const existCode = await codeModel.findOne({code: code})
    if (!existCode) {
        req.flash('message', 'A regisztrációs kód hibás!')
        res.redirect('/register')
        return
    }

    const hashedPassword = await bcrypt.hash(password1, 10)
    userModel.create({
        username: username,
        password: hashedPassword,
        email: email,
        class: className
    })
    .then(() => {
        existCode.remove()
        req.flash('message', 'Sikeres regisztráció!')
        res.redirect('/login')
        return
    })
}

const logoutUser = async (req, res) => {
    req.logout()
    res.redirect('/')
}

export {userLogin, userRegister, logoutUser, authUser, isLoggedIn, isNotLoggedIn}