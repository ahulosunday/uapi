const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(minNumber) => "user_rrrs"
 * addColumn(maxNumber) => "user_rrrs"
 * changeColumn(duration) => "user_rrrs"
 *
 */

const info = {
  revision: 3,
  name: "update five major tables",
  created: "2024-03-25T16:40:47.585Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "prescribed_drugs",
      "permittedby",
      { type: Sequelize.STRING, field: "permittedby", allowNull: true },
    
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "prescribed_drugs",
      "permitted_date",
     
      { type: Sequelize.STRING, field: "permitted_date", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "prescribed_services",
      "permittedby",
      { type: Sequelize.STRING, field: "permittedby", allowNull: true },
    
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "prescribed_services",
      "permitted_date",
     
      { type: Sequelize.STRING, field: "permitted_date", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "prescribed_tests",
      "permittedby",
      { type: Sequelize.STRING, field: "permittedby", allowNull: true },
    
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "prescribed_tests",
      "permitted_date",
     
      { type: Sequelize.STRING, field: "permitted_date", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "prescribed_investigations",
      "permittedby",
      { type: Sequelize.STRING, field: "permittedby", allowNull: true },
    
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "prescribed_investigations",
      "permitted_date",
     
      { type: Sequelize.STRING, field: "permitted_date", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "additional_item_prescriptions",
      "permittedby",
      { type: Sequelize.STRING, field: "permittedby", allowNull: true },
    
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "additional_item_prescriptions",
      "permitted_date",
     
      { type: Sequelize.STRING, field: "permitted_date", allowNull: true },
      { transaction },
    ],
  },

];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["user_rrrs", "authNumber", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
