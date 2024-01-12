const db = require('../models')
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const format = require('date-format');
require("dotenv").config();
const path = require('path')


// create main Model
const User = db.users
const Roles = db.roles
const Connacc = db.connacc
const Substa = db.substa


const validateEmail = async(req, res) => {

    let email = req.body.email

    const data = await User.findOne({ where: { email: email, status: 1 }, })
    if (data) {
        var out = { status: true, msg: 'User Exists', data: data }
    } else {
        var out = { status: false, msg: 'User not Exists', data: null }
    }

    res.status(200).send(out)

}

const buyerSellerSignup = async(req, res) => {
    try {
        const { first_name, last_name, email, mobile, password, user_type } = req.body;
        // Check if the email exists

        const userExists = await User.findOne({
            where: {
                email: email,
                status: {
                    [Op.or]: [0, 1]
                }
            }
        });
        if (userExists) {
            var out = { status: false, msg: 'Email is already exists' }
            return res.status(400).send(out);
        }

        const data = await User.create({
            first_name,
            last_name,
            mobile,
            email,
            role: user_type,
            password: await bcrypt.hash(password, 15),
            created_at: format('yyyy-MM-dd hh:mm:ss', new Date())

        });


        // Authenticate user with jwt
        const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION
        });
        var userdata = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            mobile: data.mobile,
            email: data.email,
            user_type: data.role,
            accessToken: token,
        }
        var out = { status: true, msg: 'User Signup successful', data: userdata }
        res.status(200).send(out);
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'Signup error' }
        res.status(500).send(out);
    }

}

const agentSignup = async(req, res) => {
    try {
        const { first_name, last_name, email, mobile, password, licence, user_type } = req.body;
        // Check if the email exists

        const userExists = await User.findOne({
            where: {
                email: email,
                status: {
                    [Op.or]: [0, 1]
                }
            }
        });
        if (userExists) {
            var out = { status: false, msg: 'Email is already exists' }
            return res.status(400).send(out);
        }

        const data = await User.create({
            first_name,
            last_name,
            mobile,
            email,
            role: user_type,
            password: await bcrypt.hash(password, 15),
            licence,
            created_at: format('yyyy-MM-dd hh:mm:ss', new Date())

        });


        // Authenticate user with jwt
        const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION
        });
        var userdata = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            mobile: data.mobile,
            email: data.email,
            user_type: data.role,
            licence: licence,
            accessToken: token,
        }
        var out = { status: true, msg: 'User Signup successful', data: userdata }
        res.status(200).send(out);
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'Signup error' }
        res.status(500).send(out);
    }

}

const signin = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
                status: {
                    [Op.or]: [0, 1]
                }
            }
        });
        if (!user) {
            var out = { status: false, msg: 'Email is not exists' }
            return res.status(400).send(out);
        }


        // Verify password
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            var out = { status: false, msg: 'Incorrect email and password combination' }
            return res.status(404).json(out);
        }


        // Authenticate user with jwt
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION
        });
        var userdata = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            mobile: user.mobile,
            email: user.email,
            accessToken: token,
        }
        var out = { status: true, msg: 'User Exists', data: userdata }
        res.status(200).send(out);
    } catch (err) {
        var out = { status: false, msg: 'Signup error' }
        console.error(err)
        return res.status(500).send(out);
    }
}

const userTypes = async(req, res) => {
    try {

        const data = await Roles.findAll({ where: { status: 2 }, })
        if (data) {
            var out = { status: true, msg: 'User Types Exists', data: data }
        } else {
            var out = { status: false, msg: 'User Types not Exists', data: null }
        }

        res.status(200).send(out)
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'User Types not found' }
        res.status(500).send(out);
    }

}
const connectedAccounts = async(req, res) => {
    try {

        const data = await Connacc.findAll({ where: { status: 1 }, })
        if (data) {
            var out = { status: true, msg: 'Connected Account Exists', data: data }
        } else {
            var out = { status: false, msg: 'Connected Account not Exists', data: null }
        }

        res.status(200).send(out)
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'Connected Account List not found' }
        res.status(500).send(out);
    }

}
const subscriptionStatusList = async(req, res) => {
    try {

        const data = await Substa.findAll({ where: { status: 1 }, })
        if (data) {
            var out = { status: true, msg: 'Subcription Status Exists', data: data }
        } else {
            var out = { status: false, msg: 'Subcription Status not Exists', data: null }
        }

        res.status(200).send(out)
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'Subcription Status List not found' }
        res.status(500).send(out);
    }

}
const firstName = async(req, res) => {
    try {
        var userData = req.userData.dataValues;

        const { first_name, token } = req.body;

        let dataArr = {
            first_name
        }
        await User.update(dataArr, {
            where: {
                id: userData.id
            }
        });

        const userArr = await User.findOne({
            where: {
                id: userData.id
            }
        });

        if (userArr) {
            var outData = {
                first_name: userArr.first_name,
            }

            var out = { status: true, msg: 'First Name updated successful', data: outData }
            return res.status(200).send(out);
        } else {
            var out = { status: false, msg: 'User error' }
            return res.status(500).send(out);
        }
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'User error' }
        res.status(500).send(out);
    }

}

const lastName = async(req, res) => {
    try {
        var userData = req.userData.dataValues;

        const { last_name, token } = req.body;

        let dataArr = {
            last_name
        }
        await User.update(dataArr, {
            where: {
                id: userData.id
            }
        });

        const userArr = await User.findOne({
            where: {
                id: userData.id
            }
        });

        if (userArr) {
            var outData = {
                last_name: userArr.last_name,
            }

            var out = { status: true, msg: 'Last Name updated successful', data: outData }
            return res.status(200).send(out);
        } else {
            var out = { status: false, msg: 'User error' }
            return res.status(500).send(out);
        }
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'User error' }
        res.status(500).send(out);
    }

}

const email = async(req, res) => {
    try {
        var userData = req.userData.dataValues;

        const { email, token } = req.body;

        if (true) {
            var out = { status: true, msg: 'Email update link Sent to Register email id.' }
            return res.status(200).send(out);
        } else {
            var out = { status: false, msg: 'User error' }
            return res.status(500).send(out);
        }
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'User error' }
        res.status(500).send(out);
    }

}

const password = async(req, res) => {
    try {
        var userData = req.userData.dataValues;

        const { password, token } = req.body;

        if (true) {
            var out = { status: true, msg: 'Password reset link Sent to Register email id.' }
            return res.status(200).send(out);
        } else {
            var out = { status: false, msg: 'User error' }
            return res.status(500).send(out);
        }
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'User error' }
        res.status(500).send(out);
    }

}

const connectedAccount = async(req, res) => {
    try {
        var userData = req.userData.dataValues;

        const { connected_account, token } = req.body;

        let dataArr = {
            connected_account
        }
        await User.update(dataArr, {
            where: {
                id: userData.id
            }
        });

        const userArr = await User.findOne({
            where: {
                id: userData.id
            }
        });

        if (userArr) {
            var outData = {
                connected_account: connected_account,
            }

            var out = { status: true, msg: 'Connected Account updated successful', data: outData }
            return res.status(200).send(out);
        } else {
            var out = { status: false, msg: 'User error' }
            return res.status(500).send(out);
        }
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'User error' }
        res.status(500).send(out);
    }

}

const subscriptionStatus = async(req, res) => {
    try {
        var userData = req.userData.dataValues;

        const { subscription_status, token } = req.body;

        let dataArr = {
            subscription_status
        }
        await User.update(dataArr, {
            where: {
                id: userData.id
            }
        });

        const userArr = await User.findOne({
            where: {
                id: userData.id
            }
        });

        if (userArr) {
            var outData = {
                subscription_status: subscription_status,
            }

            var out = { status: true, msg: 'Subscription Status updated successful', data: outData }
            return res.status(200).send(out);
        } else {
            var out = { status: false, msg: 'User error' }
            return res.status(500).send(out);
        }
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'User error' }
        res.status(500).send(out);
    }

}

const deleteAccount = async(req, res) => {
    try {
        var userData = req.userData.dataValues;

        const {} = req.body;

        let dataArr = {
            status: 3
        }
        await User.update(dataArr, {
            where: {
                id: userData.id
            }
        });

        const userArr = await User.findOne({
            where: {
                id: userData.id
            }
        });

        if (userArr) {
            var out = { status: true, msg: 'Account deleted successful' }
            return res.status(200).send(out);
        } else {
            var out = { status: false, msg: 'User error' }
            return res.status(500).send(out);
        }
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'User error' }
        res.status(500).send(out);
    }

}

const licence = async(req, res) => {
    try {
        var userData = req.userData.dataValues;

        const { licence, token } = req.body;

        let dataArr = {
            licence
        }
        await User.update(dataArr, {
            where: {
                id: userData.id
            }
        });

        const userArr = await User.findOne({
            where: {
                id: userData.id
            }
        });

        if (userArr) {
            var outData = {
                licence: licence,
            }

            var out = { status: true, msg: 'Licence updated successful', data: outData }
            return res.status(200).send(out);
        } else {
            var out = { status: false, msg: 'User error' }
            return res.status(500).send(out);
        }
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'User error' }
        res.status(500).send(out);
    }

}


const operationRegionState = async(req, res) => {
    try {
        var userData = req.userData.dataValues;

        const { licence, token } = req.body;

        let dataArr = {
            state
        }
        await User.update(dataArr, {
            where: {
                id: userData.id
            }
        });

        const userArr = await User.findOne({
            where: {
                id: userData.id
            }
        });

        if (userArr) {
            var outData = {
                state: state,
            }

            var out = { status: true, msg: 'State updated successful', data: outData }
            return res.status(200).send(out);
        } else {
            var out = { status: false, msg: 'User error' }
            return res.status(500).send(out);
        }
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'User error' }
        res.status(500).send(out);
    }

}

const operationRegionCity = async(req, res) => {
    try {
        var userData = req.userData.dataValues;

        const { city, token } = req.body;

        let dataArr = {
            city
        }
        await User.update(dataArr, {
            where: {
                id: userData.id
            }
        });

        const userArr = await User.findOne({
            where: {
                id: userData.id
            }
        });

        if (userArr) {
            var outData = {
                city: city,
            }

            var out = { status: true, msg: 'City updated successful', data: outData }
            return res.status(200).send(out);
        } else {
            var out = { status: false, msg: 'User error' }
            return res.status(500).send(out);
        }
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'User error' }
        res.status(500).send(out);
    }

}


/* const userType = async(req, res) => {
    try {
        var userData = req.userData;
        const { user_type, token } = req.body;

        var outData = {
            id: userData.id,
            user_type: userData.role,
            email: userData.email,
            mobile: userData.mobile,
            first_name: userData.first_name,
            last_name: userData.last_name
        }

        var out = { status: true, msg: 'User Type updated successful', data: outData }
        res.status(200).send(out);
    } catch (err) {
        console.error(err)
        var out = { status: false, msg: 'User Type error' }
        res.status(500).send(out);
    }

} */












module.exports = {
    validateEmail,
    buyerSellerSignup,
    signin,
    userTypes,
    agentSignup,
    firstName,
    lastName,
    email,
    password,
    connectedAccount,
    subscriptionStatus,
    deleteAccount,
    licence,
    operationRegionState,
    operationRegionCity,
    connectedAccounts,
    subscriptionStatusList
}