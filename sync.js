/**
 * Env setting
 */
process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';

const models = require('./models')

models.sequelize.sync().then(() => {
  console.log('database sync succeeded')
}, (error) => {
  console.log('database sync failed', error)
});