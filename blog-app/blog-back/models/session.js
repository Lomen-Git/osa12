const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db')

class Session extends Model {}

  Session.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    isDisabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sessionId: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'session',
    timestamps: false,
    underscored: true,
  })

module.exports = Session