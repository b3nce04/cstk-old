import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import flash from 'connect-flash'
import helmet from 'helmet'
import mongoose from 'mongoose'

import userRoutes from './routes/user.js'

const PORT = process.env.PORT || 3000

const app = express()

mongoose.connect(process.env.DB_URL)
    .then(() => {app.listen(PORT, () => {console.log(`Az alkalmazás fut: http://localhost:${PORT}/`)})})
    .catch((err) => {console.error(err)})

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(helmet())

app.get('/', (req, res) => {
    res.redirect('/login')
})

app.get('/login', (req, res) => {
    res.render('login', {message: req.flash('message')})
})

app.get('/register', (req, res) => {
    res.render('register', {message: req.flash('message')})
})

app.get('/account', (req, res) => {
    res.render('panel', {name: 'név', points: 5})
})

app.use('/user', userRoutes)

app.use((req, res, next) => {
    res.render('404')
})