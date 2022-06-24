import express from 'express'

import {userLogin, userRegister, logoutUser} from '../controllers/user.js'
import {createGroup} from '../controllers/group.js'

const router = express.Router()

router.post('/login', userLogin)
router.post('/register', userRegister)
//router.post('/update/details', updateUser)
router.get('/logout', logoutUser)

router.post('/group/create', createGroup)

export default router