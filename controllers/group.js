import groupModel from '../models/group.js'

const getAllGroupsByClassID = async (id) => {
    const list = await groupModel.findAll({where: {classID: id}})
    return JSON.stringify(list)
}

const getGroupById = (list, groupid) => {
	return list.find((element) => element.id == groupid);
};

const createGroup = async (req, res, next) => {
    const {name, isOpen} = req.body
    if (name.length < 3) {
        req.flash('message', 'A névnek legalább 3 karakter hosszúnak kell lennie.')
        res.redirect('/groups/create')
    }
    const newGroup = await groupModel.create({classID: req.user.classID, name: name, isOpen: isOpen === 'on'})
    if (newGroup) {
        req.flash('message', 'Sikeresen létrehoztad a csoportot!')
        res.redirect('/groups')
    }
}

export {getAllGroupsByClassID, getGroupById, createGroup}