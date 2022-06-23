import groupModel from '../models/group.js'

const getAllGroupsByClassID = async (id) => {
    const list = await groupModel.findAll({where: {classID: id}})
    return list
}

export {getAllGroupsByClassID}