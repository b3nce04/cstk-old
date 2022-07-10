import express from 'express'

import {userLogin, userRegister, updateProfile, isUserAdmin, logoutUser} from '../controllers/user.js'
import {createGroup, sendMessage, changeState} from '../controllers/group.js'

const router = express.Router()

router.post('/login', userLogin)
router.post('/register', userRegister)
router.post('/update/profile', updateProfile)
//router.post('/update/details', updateUser)
router.get('/logout', logoutUser)

router.post('/group/sendMessage/:id', sendMessage)
// If admin permission is needed, we use this middleware
router.use(isUserAdmin)
router.post('/group/create', createGroup)
router.get('/group/changeState/:id', changeState)

export default router