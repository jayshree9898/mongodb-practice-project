const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const db = require('./config/db.config');
const config = require('./config/config');
require('./helpers/global')

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));


db.dbConnection();

const router = require('./routes/index.router');
app.use('/api/v1/', router)


//server 
let server
if (config.database.protocol == "https") {
    console.log(config.database.protocol);
    const https = require('https');
    const options = {
        // key: fs.readFileSync(config.sslCertificates.privkey),
        cert: fs.readFileSync(config.sslCertificates.fullchain)
    }
    server = https.createServer(options, app)
}
else {
    const http = require('http')
    server = http.createServer(app)
}


server.listen(config.database.port, () => {
    console.log(`server running on port ${config.database.port}`);
})