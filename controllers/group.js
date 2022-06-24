import groupModel from '../models/group.js'

const getAllGroupsByClassID = async (id) => {
    const list = await groupModel.findAll({where: {classID: id}})
    return JSON.stringify(list)
}

const getGroupById = (list, groupid) => {
	return list.find((element) => element.id == groupid);
};

export {getAllGroupsByClassID, getGroupById}