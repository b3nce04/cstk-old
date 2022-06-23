import classModel from '../models/class.js'

const getClassList = async () => {
    const list = await classModel.findAll()
    return list
}

const getClassNameById = async (id) => {
    const classObject = await classModel.findOne({where: {id: id}})
    return classObject.name
}

const isModerator = async (classid, userid) => {
    const classObject = await classModel.findOne({where: {id: classid}})
    return classObject.moderatorID === userid;
}

export {getClassList, getClassNameById, isModerator}