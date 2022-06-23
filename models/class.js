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
    headTeacher: {
        type: DataTypes.INTEGER,
    },
})

Class.sync().then();


export default Class;