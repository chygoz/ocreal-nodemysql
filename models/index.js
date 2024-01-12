const dbConfig = require('../config/dbConfig.js')

const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idel: dbConfig.pool.idel
        }
    }
)

sequelize.authenticate().then(() => {
    console.log('connected..')
}).catch(err => {
    console.log('Error' + err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./usersModel.js')(sequelize, DataTypes)
db.roles = require('./rolesModel.js')(sequelize, DataTypes)
db.connacc = require('./connectedAccountsModel.js')(sequelize, DataTypes)
db.substa = require('./subscriptionStatusModel.js')(sequelize, DataTypes)
db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })

module.exports = db