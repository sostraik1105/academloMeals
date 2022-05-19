const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Users = db.define('user', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
        validate: {
            isIn: [['active', 'inactive']],
        },
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'normal',
        validate: {
            isIn: [['normal', 'admin']],
        },
    },
});

module.exports = { Users };
