import database from "../controllers/database.js";
import {DataTypes} from "sequelize";

const Group = database.define('Group', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    classID: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    isOpen: {
        type: DataTypes.BOOLEAN
    }
})

Group.sync().then();

export default Group;