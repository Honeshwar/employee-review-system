//setup express
const express = require('express');
const env = require('./config/env.js');
const ejs = require("ejs");
const path = require('path');
require('./config/mongoose.js')

const app = express();
const port = env.DEVELOPMENT.port || 5000; // if undefined or operator return first truthy value

//mw
app.use(express.urlencoded());

// to encodeand decode cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session');

app.set('view engine',"ejs");
app.set('views',path.join(__dirname,'/views/pages'));


//EJS  layout
// before all routes this middleware should be called to use layout feature
const expressLayout = require('express-ejs-layouts');//MW
app.use(expressLayout);
app.set('layout',path.join(__dirname,'/views/layouts/layout.ejs'));

// setting these to layout so that script and style file can move to head and bottom in layout.
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//static file provide
app.use(express.static('./assets'));

//console log url of each req, for that use MW
app.use('/',(req,res,next)=>{
    console.log('current requested url: ',req.url);
    console.log('req cookies',req.cookies);
    next();
});

app.use('/',require('./routers/rootRouter.js'));


// listen app on port
app.listen(port,(err)=>{
    if(err){
        console.log("server is not responding",err);
        return;
    }

    console.log("DO", '\x1b[36m"CTL+Click"\x1b[0m',"on link to visit home page of application",'\n', `\x1b[33mhttps://localhost:${port}\x1b[0m`);//using regular expression
    return;
})