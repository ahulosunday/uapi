'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
 
    await queryInterface.bulkInsert('role_permissions', [
      { id: 1,
         
     roleId: 1,
     permissionId: 1,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 2,
     roleId: 1,
     permissionId: 2,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 3,
     roleId: 1,
     permissionId: 3,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 4,
     roleId: 1,
     permissionId: 4,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 5,
     roleId: 1,
     permissionId: 5,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
   { id: 6,
     roleId: 1,
     permissionId: 6,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 7,
     roleId: 1,
     permissionId: 7,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 8,
     roleId: 1,
     permissionId: 8,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 9,
     roleId: 1,
     permissionId: 9,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 10,
     roleId: 1,
     permissionId: 10,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 11,
     roleId: 1,
     permissionId: 11,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 12,
     roleId: 1,
     permissionId: 12,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 13,
     roleId: 1,
     permissionId: 13,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 14,
     roleId: 1,
     permissionId: 14,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,{ id: 15,
     roleId: 1,
     permissionId: 15,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 16,
     roleId: 1,
     permissionId: 16,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 17,
     roleId: 1,
     permissionId: 17,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 18,
     roleId: 1,
     permissionId: 18,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 19,
     roleId: 1,
     permissionId: 19,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    },
    { id: 20,
     roleId: 1,
     permissionId: 20,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 21,
     roleId: 1,
     permissionId: 21,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 22,
     roleId: 1,
     permissionId: 22,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 23,
     roleId: 1,
     permissionId: 23,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 24,
     roleId: 1,
     permissionId: 24,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 25,
     roleId: 1,
     permissionId: 25,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 26,
     roleId: 1,
     permissionId: 26,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 27,
     roleId: 1,
     permissionId: 27,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 28,
     roleId: 1,
     permissionId: 28,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 29,
     roleId: 1,
     permissionId: 29,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 30,
     roleId: 1,
     permissionId: 30,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 31,
     roleId: 1,
     permissionId: 31,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 32,
     roleId: 1,
     permissionId: 32,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 33,
     roleId: 1,
     permissionId: 33,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 34,
     roleId: 1,
     permissionId: 34,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 35,
     roleId: 1,
     permissionId: 35,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 36,
     roleId: 1,
     permissionId: 36,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 37,
     roleId: 1,
     permissionId: 37,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 38,
     roleId: 1,
     permissionId: 38,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 39,
     roleId: 1,
     permissionId: 39,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 40,
     roleId: 1,
     permissionId: 40,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 41,
     roleId: 1,
     permissionId: 41,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 42,
     roleId: 1,
     permissionId: 42,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 43,
     roleId: 1,
     permissionId: 43,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 44,
     roleId: 1,
     permissionId: 44,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 45,
     roleId: 1,
     permissionId: 45,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 46,
     roleId: 1,
     permissionId: 46,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 47,
     roleId: 1,
     permissionId: 47,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 48,
     roleId: 1,
     permissionId: 48,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 49,
     roleId: 1,
     permissionId: 49,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 50,
     roleId: 1,
     permissionId: 50,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 51,
     roleId: 1,
     permissionId: 51,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 52,
     roleId: 1,
     permissionId: 52,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 53,
     roleId: 1,
     permissionId: 53,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ,
    { id: 54,
     roleId: 1,
     permissionId: 54,
      createdAt: '2023-07-31 06:51:23',
       updatedAt: '2023-07-31 06:51:23'
    }
    ], {});

  },

  async down (queryInterface, DataTypes) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     **/ 
     await queryInterface.bulkDelete('role_permissions', null, {});
     
  }
};
