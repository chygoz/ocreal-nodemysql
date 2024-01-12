module.exports = (sequelize, DataTypes) => {
    const Dataset = sequelize.define("connected_accounts", {
        connected_account: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })
    return Dataset
}