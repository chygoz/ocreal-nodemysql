const db = require('../models')
const User = db.users
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
require("dotenv").config();
module.exports = async(req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            throw Error("no authorization headers found")
        }
        // var token = req.headers.Authorization;
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            where: {
                id: decoded.id,
                status: {
                    [Op.or]: [0, 1]
                }
            }
        });

        if (user) {
            req.userData = user;


        } else {
            var out = { status: false, msg: 'Not a valid user' }
            return res.status(400).send(out);
        }

        next();
    } catch (error) {
        console.log(error)
        var out = { status: false, msg: 'Invalid Token' }
        return res.status(400).send(out);
    }
};