import database from "../controllers/database.js";
import {DataTypes} from "sequelize";

const Code = database.define('Code', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING
    },
})

Code.sync()

export default Code;