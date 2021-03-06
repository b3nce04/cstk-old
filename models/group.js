import database from "../controllers/database.js";
import {DataTypes} from "sequelize";

import Class from './class.js'

const Group = database.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    isOpen: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

Group.belongsTo(Class, {
    foreignKey: 'classID'
})

Group.sync()

export default Group;