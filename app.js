import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import flash from 'connect-flash'
import mongoose from 'mongoose'
import passport from 'passport'


import userRoutes from './routes/user.js'

import {authUser, isLoggedIn, isNotLoggedIn} from './controllers/user.js'

const PORT = process.env.PORT || 3000

const app = express()

mongoose.connect(process.env.DB_URL)
    .then(() => {app.listen(PORT, () => {console.log(`Az alkalmazás fut: http://localhost:${PORT}/`)})})
    .catch((err) => {console.error(err)})

app.set('view engine', 'pug')
app.set('views', 'views')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

authUser()

app.use('/user', userRoutes)

// Root
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/main')
    } else {
        res.redirect('/login')
    }
})

// EJS
app.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login', {message: req.flash('message')})
})

app.get('/register', isNotLoggedIn, (req, res) => {
    res.render('register', {message: req.flash('message')})
})

app.use((req, res, next) => {
    res.locals.VERSION = process.env.npm_package_version;
    next()
})

app.get('/main', isLoggedIn, (req, res) => {
    res.render('main', {
        name: req.user.username, 
        points: req.user.points,
        className: req.user.class,
        pictureID: req.user.pictureID,
        userID: req.user._id
    })
})

app.get('/account', isLoggedIn, (req, res) => {
    res.render('account', {
        name: req.user.username, 
        points: req.user.points,
        className: req.user.class,
        pictureID: req.user.pictureID,
        userID: req.user._id
    })
})

app.get('/teszt', isLoggedIn, (req, res) => {
    res.render('teszt', {
        name: req.user.username, 
        points: req.user.points,
        className: req.user.class,
        pictureID: req.user.pictureID,
        userID: req.user._id
    })
})

// Error page
app.use((req, res, next) => {
    res.render('404')
})