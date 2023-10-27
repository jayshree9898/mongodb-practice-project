const User = require('../model/user')
const UserSession = require('../model/userSession.model');
const Validator = require('validatorjs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// const userSignup = async (req, res) => {
//     let validation = new Validator(req.body, {
//         user_name: 'required|string',
//         email: 'required|email',
//         password: 'required|min:5|max:10'
//     })
//     if (validation.fails()) {
//         firstMessage = Object.keys(validation.errors.all())[0];
//         return RESPONSE.error(res, validation.errors.first(firstMessage))
//     }

//     try {
//         const { user_name, email, password } = req.body;

//         const isExist = await User.find({ where: { email: email } });
//         if (!isExist) {
//             return RESPONSE.error(res, 1003)
//         }
//         const userData = User.create({ user_name, email, password })
//         return RESPONSE.success(res, 1001, userData)
//     } catch (error) {
//         return RESPONSE.error(res, 9999)
//     }
// }


const userSignup = async (req, res) => {
    let validation = new Validator(req.body, {
        user_name: 'required|string|max:50',
        email: 'required|max:50',
        password: 'required|min:6|max:15'
    });

    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { user_name, email, password } = req.body;

        const existUser = await User.find({ email: email });

        if (existUser.length) {
            return RESPONSE.error(res, "user account exist")
        }
        const userData = await User.create({ user_name, email, password });
        // const token = jwt.sign({ email, user_name, user_id: userData.id }, config.jwt_secureKey, { expiresIn: '1h' });
        // const session = await UserSession.create({ user_id: userData.id, token })


        return RESPONSE.success(res, 1001, userData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}



const login = async (req, res) => {
    let validation = new Validator(req.body, {
        email: 'required',
        password: 'required'
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return RESPONSE.error(res, 1004)
        }

        const ispasswordMatch = await bcrypt.compare(password, user.password);

        if (!ispasswordMatch) {
            return RESPONSE.error(res, 1005)
        }

        const token = jwt.sign({ email, user_id: user.id }, config.jwt_secureKey, { expiresIn: '1h' });
        const session = await UserSession.create({ user_id: user.id, token });

        return RESPONSE.success(res, 1002, session);
    } catch (error) {

        return RESPONSE.error(res, 9999)
    }
}


const getProfile = async (req, res) => {
    try {
        const isAuth = req.user;

        const userprofile = await User.find({ _id: isAuth });
       
        return RESPONSE.success(res, 1006, userprofile)
    } catch (error) {
        return RESPONSE.error(res, 9999)
    }
}

module.exports = {
    userSignup,
    login,
    getProfile
}