const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')


module.exports = {
  up: async ({ context: queryInterface }) => {


    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
          }
      },
      name: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
      }
    })

    await queryInterface.createTable('blogs', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          author: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          url: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          title: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          likes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
          },
          created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
          },
          updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
          }
    })

    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}