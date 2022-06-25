import database from "../controllers/database.js";
import {DataTypes} from "sequelize";

import Class from './class.js'

const Information = database.define('informations', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
        type: DataTypes.TEXT
    },
})

Information.belongsTo(Class, {
    foreignKey: 'classID'
})

Information.sync()

export default Information;