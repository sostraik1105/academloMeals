const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Reviews = db.define('review', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    raiting: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = { Reviews };
