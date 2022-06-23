import database from "../controllers/database.js";
import {DataTypes} from "sequelize";

const User = database.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    emailAddress: {
        type: DataTypes.STRING
    },
    fullName: {
        type: DataTypes.STRING
    },
    birthDate: {
        type: DataTypes.DATE
    },
    classID: {
        type: DataTypes.INTEGER
    },
    registrationDate: {
        type: DataTypes.DATE
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
})

User.sync().then();

export default User;