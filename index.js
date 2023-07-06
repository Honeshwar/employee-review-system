//setup express
const express = require('express');
const env = require('./config/env.js');
const ejs = require("ejs");
const path = require('path');
const db = require('./config/mongoose.js')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport.js');

// connect flash
const flash = require('connect-flash');
const Flash_MW = require('./config/flashMiddleware');

const app = express();
const port = env.DEVELOPMENT.port || 5000; // if undefined or operator return first truthy value

//mw to parse req data in req.body(decode)
app.use(express.urlencoded({ extended: false }));

// to encode and decode cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// setup template engine
app.set('view engine',"ejs");
app.set('views',path.join(__dirname,'/views/pages'));//set path where view engine find ejs files,at the time of render page give path og ejs file related to this path


//EJS  layout
// before all routes this middleware should be called to use layout feature
const expressLayout = require('express-ejs-layouts');//MW
app.use(expressLayout);
app.set('layout',path.join(__dirname,'/views/layouts/afterAddingSessionLayout.ejs'));

// setting these to layout so that script and style file can move to head and bottom in layout.
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//static file provide
app.use(express.static('./assets'));

// Session middleware
/********  adding middleware for the sessions ********/
app.use(session({
// by default name:connect.sid,sid = session id 
// name:'employee_session',//cookie name when use passport
//TODO change the secret before deployment in production
secret:env.DEVELOPMENT.session_secret,
saveUninitialized:false, // when user is not logged in then should i save extra data.
resave:false,  // when user is login if session data is not changed it will prevent to re-saving again and again
cookie:{
    maxAge:(1000*60*100)
},
store: MongoStore.create(//using connect-mongo it create a schema and store a cooke in mongodb
    {
        mongoUrl:env.DEVELOPMENT.mongodbUrlForSessionStore,
        autoRemove:'disabled',
        mongooseConnection: db,
        collectionName: "sessions",
        ttl: 24 * 60 * 60, // Session TTL (expiration) in seconds
        autoRemove: 'native', // Enable automatic session removal
        collectionName: 'sessions', // Collection name for storing sessions
        stringify: false, // Whether to stringify the session data
        
    },
    function(err){
        console.log(err||'connect to the mongo connect');
    }
),
}));
  
// Passport middleware 
app.use(passport.initialize());//initializing the passport.js
app.use(passport.session());
// this middleware add user to req.locals
app.use(passport.setAuthenticatedUser); // if user is authenticated than set it to in res.locals.user=

 //always use flash , tell to express to use flash in express app
 app.use(flash());
 app.use(Flash_MW.setFlash);


//console log url of each req, for that use MW, just for console
app.use('/',(req,res,next)=>{
    console.log('current requested url: ',req.url);
    // console.log('req cookies at entry point file',req.cookies);
    // console.log('current Session User',req.locals?.currentSessionUser);
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

    console.log(`server is running on port:${port}`);
    return;
});


