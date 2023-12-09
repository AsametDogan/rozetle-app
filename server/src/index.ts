import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import database from './config/database';
import cors from 'cors';
const admin = require('firebase-admin');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Firebase Admin SDK ile yapılandırma

dotenv.config({ path: __dirname + '/.env' });

const privateKey = fs.readFileSync('/etc/letsencrypt/live/rozetle.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/rozetle.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/rozetle.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

//const app: Express = express();
database.db()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/api', routes);
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

const PORT = process.env.PORT || 5001;

//app.listen(PORT, () => {
//    console.log('Server started on port ' + PORT);
//});


const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log('HTTPS Server running on port ' + PORT);
});
