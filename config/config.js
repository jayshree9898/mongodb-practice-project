require('dotenv').config();


module.exports = {
    db_url: process.env.DATABASE,
    aap_path: process.env.APP_PROJECT_PATH,
    jwt_secureKey: process.env.jwt_secureKey,

    database: {
        port: process.env.PORT,
        protocol: process.env.PROTOCOL || "http",
        // host: process.env.HOST,
        dialect: process.env.DIALECT
    },

    sslCertificates: {
        privkey: process.env.PRIVKEY,
        fullchain: process.env.FULLCHAIN
    }
}