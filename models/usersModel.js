module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        role: {
            type: DataTypes.INTEGER
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        licence: {
            type: DataTypes.STRING
        },
        connected_account: {
            type: DataTypes.STRING
        },
        State: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        created_at: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })
    return Users
}