import database from "../controllers/database.js";
import {DataTypes} from "sequelize";

import Class from './class.js'

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
        type: DataTypes.DATEONLY
    },
    color: {
        type: DataTypes.STRING,
        defaultValue: '#FFFFFF'
    },
    registrationDate: {
        type: DataTypes.DATE,
        defaultValue: database.fn('NOW')
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

User.belongsTo(Class, {
    foreignKey: 'classID'
})

User.sync()

export default User;