import database from "../controllers/database.js";
import {DataTypes} from "sequelize";

const Class = database.define('Class', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.CHAR
    },
    moderatorID: {
        type: DataTypes.INTEGER
    },
    headTeacherName: {
        type: DataTypes.STRING,
    },
})

Class.sync().then();


export default Class;