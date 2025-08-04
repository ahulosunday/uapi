'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
      await queryInterface.bulkInsert('info', [{
        name:'ROYAL LORD HOSPITAL',
        address:'DUTSE ALHAJI, FCT ABUJA',
        phone:'08056900098',
        email:'demo@gmail.com',
        web:'',
        smsapi:'https://',
        smsusername:'',
        smspassword:'',
        logo:'',
        last_update_date:'',
        short_name:'RLH',
        watermark:'',
        token:'',
        senderid:'',
        emailpass:'',
        emailhost:'',
        emaildefault:'',
        port:'',
        email_img:'',
        http:'',
        img_path:'',
        banner:'',
        emailname:'',
        descr:'',
        ssl:'',
        wallet_ccount_id:'',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      }], {});
    
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
