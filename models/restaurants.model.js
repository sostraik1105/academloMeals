const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Restaurants = db.define('restaurant', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    raiting: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['enable', 'disabled']],
        },
    },
});

module.exports = { Restaurants };
