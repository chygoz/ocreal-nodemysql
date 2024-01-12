module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("roles", {
        role: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })
    return Users
}