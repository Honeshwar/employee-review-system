//setup express
const express = require('express');
const env = require('./config/env.js');
const ejs = require("ejs");
const path = require('path');
require('./config/mongoose.js')
const session = require('express-session');
const MongoStore = require('connect-mongo');
// const passport = require('./config/passport.js');

const app = express();
const port = env.DEVELOPMENT.port || 5000; // if undefined or operator return first truthy value

//mw
app.use(express.urlencoded({ extended: false }));

// to encode and decode cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// setup template engine
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

/********  adding middleware for the sessions ********/
app.use(session({
    name:'employee-cookie',//
    //TODO change the secret before deployment in production
    secret:'blahblahblah',
    saveUninitialized:false, // when user is not logged in then should i save extra data.
    resave:false,  // when user is login if session data is not changed it will prevent to re-saving again and again
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(//using connect-mongo it create a schema and store a cooke in mongodb
        {
            mongoUrl:env.DEVELOPMENT.mongodbUrlForSessionStore,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err||'connect to the mongo connect');
        }
    ),
  }));
  
//   // initializing the passport.js
//   app.use(passport.initialize());
//   app.use(passport.session());
//   // this middleware add user to response of which can be used to creating the UI.
//   app.use(passport.setAuthenticatedUser)
  


//console log url of each req, for that use MW, just for console
app.use('/',(req,res,next)=>{
    console.log('current requested url: ',req.url);
    console.log('req cookies at entry point file',req.cookies);
    next();
});

// use router MW to forward this requested url
app.use('/',require('./routers/rootRouter.js'));


// listen app on port
app.listen(port,(err)=>{
    if(err){
        console.log("server is not responding",err);
        return;
    }

    console.log("DO", '\x1b[36m"CTL+Click"\x1b[0m',"on link to visit home page of application",'\n', `\x1b[33mhttps://localhost:${port}\x1b[0m`);//using regular expression
    return;
});


