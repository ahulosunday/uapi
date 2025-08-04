'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('permissions', [
  /*    {
        id: 145,
        name: 'MAKE_INITIAL_DEPOSIT',
        description:"Can add Initial deposit",
        createdAt: '2020-07-02 07:38:46',
        updatedAt: '2020-07-02 07:38:46'
        },
        {
          id: 146,
          name: 'MAKE_REFUND_EXCESS',
          description:"Can refund excess fund",
          createdAt: '2020-07-02 07:38:46',
          updatedAt: '2020-07-02 07:38:46'
          },
          */
{
	id: 147,
	name: 'ADD_SALARY_SCALE',
  description:"Can add salary scale",
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},{
  id: 148,
	name: 'ADD_SALARY_LEVEL',
    description:"Can add salary scale level",
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},
  {
    id: 149,
    name: 'ADD_SALARY_STEP',
      description:"Can add salary scale step",
    createdAt: '2020-07-02 07:38:46',
    updatedAt: '2020-07-02 07:38:46'
    },
    {
      id: 150,
      name: 'ADD_SALARY_ITEM',
        description:"Can add ps section item",
      createdAt: '2020-07-02 07:38:46',
      updatedAt: '2020-07-02 07:38:46'
      },
      {
        id: 151,
        name: 'ADD_SALARY_DETAIL',
          description:"Can add ps detail",
        createdAt: '2020-07-02 07:38:46',
        updatedAt: '2020-07-02 07:38:46'
        },
        {
          id: 152,
          name: 'ADD_SCALEWIDE',
            description:"Can add scalewide",
          createdAt: '2020-07-02 07:38:46',
          updatedAt: '2020-07-02 07:38:46'
          },
          {
            id: 153,
            name: 'ADD_INSURANCE',
              description:"Can add Insurance",
            createdAt: '2020-07-02 07:38:46',
            updatedAt: '2020-07-02 07:38:46'
            },
            {
              id: 154,
              name: 'VIEW_INSURANCE',
                description:"Can view Insurance",
              createdAt: '2020-07-02 07:38:46',
              updatedAt: '2020-07-02 07:38:46'
              },
              {
                id: 159,
                name: 'ADD_TEST',
                  description:"can add tests",
                createdAt: '2020-07-02 07:38:46',
                updatedAt: '2020-07-02 07:38:46'
                },

            

], {});

},

async down (queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
};

