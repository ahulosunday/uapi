'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert('account_types', [

{
	id: 1,
	name: 'Fixed Assets',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},

{
	id: 2,
	name: 'Account Payable',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},

{
	id: 3,
	name: 'Account receivables',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},

{
	id: 4,
	name: 'Other Currrent Liabilities',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},

{
	id: 5,
	name: 'Other Currrent Assets',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},
{
	id: 6,
	name: 'Long Term Liabilities',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},
{
	id: 7,
	name: 'Expenses',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},
{
	id: 8,
	name: 'Equity',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},
{
	id: 9,
	name: 'Sales Returns and Allowances',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},
{
	id: 10,
	name: 'Income',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},

{
	id: 11,
	name: 'Opening Stock',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},
{
	id: 12,
	name: 'Purchases Returns and Allowances',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},	
{
	id: 13,
	name: 'Purchase',
	createdAt: '2020-07-02 07:38:46',
	updatedAt: '2020-07-02 07:38:46'
	},
{
id: 14,
name: 'Closing Stock',
createdAt: '2020-07-02 07:38:46',
updatedAt: '2020-07-02 07:38:46'
}

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
