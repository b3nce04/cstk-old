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
    color: {
        type: DataTypes.STRING,
        defaultValue: '#FFFFFF'
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
    suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ipAddress: {
        type: DataTypes.STRING
    },
})

User.sync().then();

export default User;