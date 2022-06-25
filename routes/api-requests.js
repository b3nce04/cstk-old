import express from 'express'

import {userLogin, userRegister, updateColor, logoutUser} from '../controllers/user.js'
import {createGroup, sendMessage, changeState} from '../controllers/group.js'

const router = express.Router()

router.post('/login', userLogin)
router.post('/register', userRegister)
router.post('/update/color', updateColor)
//router.post('/update/details', updateUser)
router.get('/logout', logoutUser)

router.post('/group/create', createGroup)
router.post('/group/sendMessage/:id', sendMessage)
router.get('/group/changeState/:id', changeState)

export default router