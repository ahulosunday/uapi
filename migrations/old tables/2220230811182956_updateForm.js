const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "enrolee_rrr_codes", deps: [user_rrrs, users]
 * addColumn(residentWard) => "gforms"
 * addColumn(registeredWard) => "gforms"
 * addColumn(wardOrigin) => "gforms"
 * addIndex() => "hospitals"
 * addIndex() => "role_permissions"
 *
 */

const info = {
  revision: 5,
  name: "updateForm",
  created: "2023-08-11T18:29:56.091Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "enrolee_rrr_codes",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        user_rrrId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "user_rrrs", key: "id" },
          field: "user_rrrId",
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "user", key: "id" },
          field: "userId",
          allowNull: false,
        },
        code: {
          type: Sequelize.STRING,
          field: "code",
          unique: true,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "gforms",
      "residentWard",
      { type: Sequelize.INTEGER, field: "residentWard", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "gforms",
      "registeredWard",
      { type: Sequelize.INTEGER, field: "registeredWard", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "gforms",
      "wardOrigin",
      { type: Sequelize.INTEGER, field: "wardOrigin", allowNull: false },
      { transaction },
    ],
  },
  
];

const rollbackCommands = (transaction) => [
  
  {
    fn: "removeColumn",
    params: ["gforms", "residentWard", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["gforms", "registeredWard", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["gforms", "wardOrigin", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["enrolee_rrr_codes", { transaction }],
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
