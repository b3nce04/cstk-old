import express from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import mongoose from 'mongoose'

import userModel from '../models/user.js'

const router = express.Router()

router.post('/login', async (req, res) => {
    const {username, password} = req.body

    res.redirect('/account')
})

router.post('/register', async (req, res) => {
    const {username, password1, password2, email} = req.body;
    
    if (password1 !== password2) {
        req.flash('message', 'A két jelszó nem egyezik!')
        res.redirect('/register')
    }

    const existUsername = await userModel.findOne({username: username})
    if (existUsername) {
        req.flash('message', 'Ez a felhasználónév már létezik!')
        res.redirect('/register')
    }

    const existEmail = await userModel.findOne({email: email})
    if (existEmail) {
        req.flash('message', 'Ez az e-mail cím már létezik!')
        res.redirect('/register')
    }

    const hashedPassword = await bcrypt.hash(password1, 10)
    userModel.create({
        username: username,
        password: hashedPassword,
        email: email
    })
    .then(() => {
        req.flash('message', 'Sikeres regisztráció!')
        res.redirect('/login')
    })
})

export default router