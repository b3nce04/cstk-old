import database from "../controllers/database.js";
import {DataTypes} from "sequelize";

const Class = database.define('Class', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    },
    adminID: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    headTeacherName: {
        type: DataTypes.STRING,
    },
})

Class.sync()

export default Class;