const mongoose = require('mongoose');//odm help to use mongodb
const env = require('./env');
const connect = mongoose.connect(env.DEVELOPMENT.mongodbUrl);
connect.then(()=>{
    console.log('our App is connected to mongodb ');
}).catch((e)=>{
    console.log('while connecting to mongodb some issue appears',e);
});

module.exports = mongoose.connection;