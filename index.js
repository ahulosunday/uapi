const { sequelize } = require('./models');
const bodyParser = require('body-parser')
const cors = require("cors")
const express  = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser')
require("dotenv").config({ path: "./.env" });
const formatDate = require('./helpers/formatDate')
const getUser_rrrByExpireToday = require('./controllers/user_rrr')
const getActiveRegistration = require('./controllers/user_rrr_code')
const pdfs = require('./helpers/pdf')
const gform = require('./controllers/gforms')
const port = process.env.DB_PORT;
const inProduction = process.env.NODE_ENV;

const app = express();
app.use(express.json()) 
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//app.use(bodyParser.json({ limit: '1000mb' })); 
//app.use(bodyParser.urlencoded({ extended: true, limit: '1000mb' }));
app.use(
  cors({
    origin: (inProduction === 'production') ? "http://192.168.130.123:3000" : "http://localhost:3000"
  })
);

//================POSTS USERS==========
app.use('/api/auth', routes);
const cron = require('node-cron');
//const pdfRead = './public/upload/hmo.pdf'

cron.schedule('* * * * *', () => {
console.log('Running every minute ....go');
//const v = pdfs.getPDF(pdfRead)

 //const v = getActiveRegistration.getActiveRegistration()
//const val = getUser_rrrByExpireToday.getUser_rrrByExpireToday(formatDate.formatDate(new Date()));
//const arr3 = getUser_rrrByExpireToday.getUser_rrrByExpireNotify(3);
});
//console.log('Running every minute ....')

cron.schedule('30 9 * * *', () => {
 console.log('Running a task every day at 9:30 AM');
  const val = getUser_rrrByExpireToday.getUser_rrrByExpireToday(formatDate.formatDate(new Date()));
 const arr0 = getUser_rrrByExpireToday.getUser_rrrByExpireNotify(30);
 const arr1 = getUser_rrrByExpireToday.getUser_rrrByExpireNotify(20);
 const arr2 = getUser_rrrByExpireToday.getUser_rrrByExpireNotify(10);
 const arr3 = getUser_rrrByExpireToday.getUser_rrrByExpireNotify(3);
  const arr4 = getUser_rrrByExpireToday.getUser_rrrByExpireNotify(2);
});



app.listen({ port: port}, async () => {
   await sequelize.authenticate()
   console.log('App connected successfully: port: ' + port + ', Production ? '+ inProduction)

})

/**
npm install pg body-parser xlsx cors express cookie-parser sequelize --save bcryptjs jsonwebtoken multer mysql2 nodemailer sequelize-cli --save node-cron moment speakeasy pdf-parse pdfreader
 && sequelize db:migrate && sequelize db:seed:all
&& sequelize db:migrate --name 2220230705145540-dropTable && sequelize db:seed --seed 220230725190525-role_permission_4.js
 ==========================================
 "username": "dbs_tdz6_user",
    "password": "GcrJIEbudgkaqsQGMMbIkYgcLusJFfQU",
    "database": "dbs_tdz6",
    "host": "dpg-ckc0au6smu8c73bkjmtg-a",
    "port": 5432,
    "dialect": "postgres"
    =========================================
 
 
 
 */
 