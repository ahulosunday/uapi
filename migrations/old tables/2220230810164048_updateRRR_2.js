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
  name: "updateRRR_2",
  created: "2023-09-11T16:40:47.585Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "user_rrrs",
      "authNumber",
      { type: Sequelize.STRING, field: "authNumber", allowNull: true },
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
