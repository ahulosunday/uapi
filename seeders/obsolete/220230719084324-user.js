'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */
      await queryInterface.bulkInsert('users', [{
        username: 'admin@gmail.com',
        id:1,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Super-admin',
        othername: 'Admin',
        email:'admin@gmail.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
            username: 'candidusochayi@yahoo.com',
        id:2,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Ochiyi',
        othername: 'Candidus',
        email:'candidusochayi@yahoo.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d1',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
       username: 'michaelamehjohn@gmail.com',
        id:3,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Ameh',
        othername: 'Michiel',
        email:'michaelamehjohn@gmail.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d3',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
     
        username: 'uralydia@yahoo.com',
        id:5,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Kalu',
        othername: 'Lydia',
        email:'uralydia@yahoo.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d5',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
      
        username: 'ab.yagba@gmail.com',
        id:6,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Yagba',
        othername: 'Abraham K.',
        email:'ab.yagba@gmail.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d6',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
      
        username: 'Elvispundit@gmail.com',
        id:7,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Mbila',
        othername: 'Elvis',
        email:'Elvispundit@gmail.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d7',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
        username: 'ifeomaanika@gmail.com',
        id:8,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Anika',
        othername: 'Ifeoma',
        email:'ifeomaanika@gmail.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d8',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
        username: 'ahiwechris@yahoo.com',
        id:9,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Ahiwe',
        othername: 'Christopher',
        email:'ahiwechris@yahoo.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d9',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
               username: 'emmanuel.irokwe@doch.com',
        id:10,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Irokwe',
        othername: 'Emmanuel Ebere',
        email:'emmanuel.irokwe@doch.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d10',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
         username: 'ernest_uhiene@yahoo.com',
        id:11,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Uhiene',
        othername: 'Ernest',
        email:'ernest_uhiene@yahoo.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d11',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
        username: 'sammyco4sure@yahoo.com',
        id:12,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'David',
        othername: 'Samson',
        email:'sammyco4sure@yahoo.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d12',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
    
        username: 'dozie50000@gmail.com',
        id:13,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'NZE-OPARA',
        othername: 'CHIEDOZI DAN',
        email:'dozie50000@gmail.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d13',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
        username: 'SrJulie@gmail.com',
        id:14,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Onukwufor',
        othername: 'ChichiJulie',
        email:'SrJulie@gmail.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d14',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {

        username: 'Inya@chukwudi.com',
        id:15,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Inya',
        othername: 'Chukwudi',
        email:'Inya@chukwudi.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d15',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
        
        username: 'Immanuelterngu@gmail.com',
        id:16,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Terngu',
        othername: 'Emmanuel',
        email:'Immanuelterngu@gmail.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d16',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
                username: 'simonanya@gmail.com',
        id:17,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Anyamwu',
        othername: 'Simon',
        email:'simonanya@gmail.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d17',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
       
        username: 'stembadc@yahoo.co.uk',
        id:18,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Mbanu',
        othername: 'Stella',
        email:'stembadc@yahoo.co.uk',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d18',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
    
        username: 'ezejoyyy@gmail.com',
        id:19,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Eze',
        othername: 'Joy',
        email:'ezejoyyy@gmail.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d19',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      },
      {
                username: 'usamahsydney@gmail.com',
        id:20,
        password: '$2a$10$dBkqwfARQbWy4kn569JppujDuSP.P4oNm0Oj7.P8PtC.i0FGbRLRG',
        surname: 'Usamah',
        othername: 'Sydney',
        email:'usamahsydney@gmail.com',
        uiid:'12a949e0-2f69-11ee-8b5e-47bb6a50763d20',
        roleid: 1,
        imgurl: 'images.png',
        phone:'08161381937',
        isActive:1,
        createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
       
      }

      ], {});
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * */ 
     await queryInterface.bulkDelete('users', null, {});
    
  }
};
