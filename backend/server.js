// requiring and creating express app 
const express = require('express');
const app = express();
const path = require('path')
// morgan logger
const logger = require('morgan')
// fs
const fs = require('fs')
// auth routes
const authRoutes = require('./routes/auth-routes');
// ejs view engine
app.set('view engine', 'ejs');

const stream = fs.createWriteStream(path.join(__dirname, 'logger.log'), {flags: 'a'})
app.use(logger('dev', {stream: process.env.NODE_ENV === 'production' ? stream : ""}))
// cors
const cors = require('cors')
app.use(cors())
// Gmail API + nodemailer
const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '267476187571-5moqftp12vh74afkev4j0qipdj8ki5p6.apps.googleusercontent.com'
const CLIENT_SECRET = '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' 
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04mtlBxcsC3ngCgYIARAAGAQSNwF-L9IrZ3GFxeIGPJEOlVB1AsnZvu0wCLAuIb-No-nLywp_brDeaaKMRFlpw9TlfmR0LE3nI-o'

const oAUth2CLient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
oAUth2CLient.setCredentials({refresh_token: REFRESH_TOKEN})

async function  sendEmail() {
    try {
        const accessToken = await oAUth2CLient.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'kaddechiala@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'kaddechiala@gmail.com',
            to: 'atf.kaddechi@gmail.com ',
            subject: 'Congratulations',
            text: 'Hello ! Thanks for joining us my application is now using Gmail API !',
            html: '<h1 style="color=white; line-height: 12px">Hello ! <br/><br/> Thanks for joining us ! <br/><br/> My application is now using Gmail API ! <br/><br/> Kaddechi Ala</h1>'
        };

        const result = await transport.sendMail(mailOptions)

        return result;
    } catch (error) {
        return error
    }
}

sendEmail()
 .then((result) => console.log('Email sent...', result))
 .catch((error) => console.log(error))

// importing route module from routes folder 
const routeProjects = require('./routes/projects')
// requiring member model
const routeMembers = require('./routes/members');
// share public folder and make it accessible 
// app.use(express.static('./public'))
app.use(express.json()) // if we don't use this then we won't have that data in req.body
// requiring and accessing .env variables 
require('dotenv').config();
// requiring connection to DB connect.js file
const connectDB = require('./db/connect');
// Sending welcome message to the client 
app.get('/', (req,res) => {
    res.render('home')
})
// Using Projects route 
// http//127.0.0.1:4000/projects/
app.use('/projects', routeProjects);
// Using Members route
// http//127.0.0.1:4000/members/
app.use('/members', routeMembers);
// using auth routes
app.use('/auth', authRoutes);

// Creating a local server on port process.env.port
async function start(req,res) {
    try {
        await connectDB(process.env.mongo_uri);
        app.listen(process.env.port, () => {
            console.log('Server is listing on port : ', process.env.port);
        });
    } catch (error) {
        res.json({error: error})
    }
}
// Calling start(main) function 
start();
