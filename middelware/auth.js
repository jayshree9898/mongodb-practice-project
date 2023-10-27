const db = require('../config/db.config');
const User = require('../model/user')
const UserSession = require('../model/userSession.model');


const AuthUser = async (req, res, next) => {
    const headerToken = req.headers.authorization ? req.headers.authorization : null;

    const isAuth = await UserSession.findOne({ token: headerToken });

    if (isAuth != null) {

        const userExist = await User.find({ _id: isAuth.user_id });

        if (userExist) {
            req.user = userExist;
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: 'unauthorize user'
            })
        }
    } else {
        return res.status(401).json({
            success: false,
            message: 'unauthorize user'
        })
    }
}








module.exports = {
    AuthUser
}

