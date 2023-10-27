const Messages = {
    "1001": "signUp Successfully.",
    "1002": "login successfully",
    "1003": "Email already Exist.",
    "1004": "User not found",
    "1005": "Password not match",
    "1006": "profile get successfully.",


    "9999": "something want wrongs"
}


module.exports.getMessage = function (messageCode) {
    if (isNaN(messageCode)) {
        return messageCode
    }
    return messageCode ? Messages[messageCode] : ''
}



