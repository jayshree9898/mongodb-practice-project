const Mongoose = require('mongoose');
const config = require('./config');

const dbConnection = async () => {
    try {
        const connection = await Mongoose.connect(config.db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        if (connection) {
            console.log("database connect successfully..");
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    dbConnection
}