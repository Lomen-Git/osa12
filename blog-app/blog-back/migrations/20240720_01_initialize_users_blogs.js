const { DataTypes } = require('sequelize')


module.exports = {
    up: async ({ context: queryInterface }) => {
    
        await queryInterface.addColumn('blogs', 'year', {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1990,
            max: new Date().getFullYear()
        }
        })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year');
  }
}
