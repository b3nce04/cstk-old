import classModel from "../models/class.js";

const getClassList = async () => {
	const list = await classModel.findAll();
	return JSON.stringify(list);
};

const getClassById = (list, id) => {
	return list.find((element) => element.id === id);
};

const isAdmin = (classObject, userid) => {
	if (classObject) {
		if (classObject.adminID == userid) {
			return true;
		}
	}
	return false;
};

export { getClassList, getClassById, isAdmin };
