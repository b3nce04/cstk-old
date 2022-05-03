import express from 'express'

import {userLogin, userRegister, updateUser, logoutUser} from '../controllers/user.js'

const router = express.Router()

router.post('/login', userLogin)
router.post('/register', userRegister)
router.post('/update/:type', updateUser)
router.get('/logout', logoutUser)

export default router