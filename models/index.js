const fs = require('fs')
const path = require('path')
const Sequelize = require("sequelize")
const config = require(path.join(__dirname, '..', 'config.json'))[process.env.NODE_ENV]
const sequelize = new Sequelize(config.database.database,
                                config.database.username,
                                config.database.password,
                                config.database.options)
let db = {}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach((file) => {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db['sequelize'] = sequelize
db['Sequelize'] = Sequelize

module.exports = db
