'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('hmos', 'address', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          defaultValue: 1

        }, { transaction: t }),
        queryInterface.addColumn('hmos', 'phone', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          defaultValue: 1
        }, { transaction: t }),
         queryInterface.addColumn('hmos', 'email', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          defaultValue: 1
        }, { transaction: t }),
           queryInterface.addColumn('hmos', 'types', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1
        }, { transaction: t }),
         queryInterface.addColumn('hmos', 'countryId', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1
        }, { transaction: t }),
         queryInterface.addColumn('hmos', 'regionId', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1
        }, { transaction: t }),
         queryInterface.addColumn('hmos', 'stateId', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1
        }, { transaction: t }),
         queryInterface.addColumn('hmos', 'lgaId', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1
        }, { transaction: t }),
         queryInterface.addColumn('hmos', 'councilwardId', {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('hmos', 'address', { transaction: t }),
        queryInterface.removeColumn('hmos', 'phone', { transaction: t }),
        queryInterface.removeColumn('hmos', 'email', { transaction: t }),
        queryInterface.removeColumn('hmos', 'countryId', { transaction: t }),
         queryInterface.removeColumn('hmos', 'regionId', { transaction: t }),
          queryInterface.removeColumn('hmos', 'stateId', { transaction: t }),
           queryInterface.removeColumn('hmos', 'lgaId', { transaction: t }),
            queryInterface.removeColumn('hmos', 'councilwardId', { transaction: t }),
            queryInterface.removeColumn('hmos', 'types', { transaction: t }),
      ]);
    });
  }
};
