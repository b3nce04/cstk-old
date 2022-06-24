import classModel from "../models/class.js";

const getClassList = async () => {
	const list = await classModel.findAll();
	return JSON.stringify(list);
};

const getClassById = (list, id) => {
	return list.find((element) => element.id === id);
};

const isAdmin = (list, classid, userid) => {
	const classObject = getClassById(list, classid);
	if (classObject) {
		if (classObject.adminID == userid) {
			return true;
		}
	}
	return false;
};

export { getClassList, getClassById, isAdmin };
