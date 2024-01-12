module.exports = (sequelize, DataTypes) => {
    const Dataset = sequelize.define("subscription_status", {
        subscription_status: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })
    return Dataset
}