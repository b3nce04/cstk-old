import informationModel from '../models/information.js';

const getInformations = async (classID) => {
	const list = await informationModel.findAll({where: {classID: classID}})
	return JSON.stringify(list);
};

export {getInformations};