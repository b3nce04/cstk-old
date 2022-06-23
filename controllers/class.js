import classModel from '../models/class.js'

const getClassList = async () => {
    const list = await classModel.findAll()
    return list
}

const getClassNameById = async (id) => {
    const classObject = await classModel.findOne({where: {id: id}})
    return classObject.name
}

export {getClassList, getClassNameById}