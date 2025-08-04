'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    queryInterface.addIndex(
        'salaryscales',
        ['name','longname'],
        {
          indicesType: 'UNIQUE',
           unique:true
          
          
         
        }
    );

    queryInterface.addIndex(
        'pyrllevels',
        ['scale','level'],
        {
          indicesType: 'UNIQUE',
           unique:true
          
          
         
        }
    );

    queryInterface.addIndex(
        'steps',
        ['scale','level','step'],
        {
          indicesType: 'UNIQUE',
           unique:true
          
          
         
        }
    );
    queryInterface.addIndex(
        'pyrlsalary_items',
        ['name'],
        {
          indicesType: 'UNIQUE',
           unique:true
        }
    );
    queryInterface.addIndex(
        'pyrlpsdetails',
        ['name', 'psection'],
        {
          indicesType: 'UNIQUE',
           unique:true
          
          
         
        }
    );

},

async down (queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
}
};
