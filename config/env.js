//env =   environment variable
//Development environment variable
const DEVELOPMENT = {
    port:7000,
    mongodbUrl:"mongodb://127.0.0.1:27017/EMPLOYEE_REVIEW_SYSTEM_DEVELOPMENT",
    mongodbUrlForSessionStore:"mongodb://127.0.0.1:27017/EMPLOYEE_SESSION_DEVELOPMENT",
    session_secret:'blahblahblah',
    admin:{
        // name:"Shawn Mendes",
        // email:'admin123@gmail.com',
        // password:"1",
        admin_token:'12345',
    }
};
//Production environment variable
const PRODUCTION = {};

module.exports = {
    DEVELOPMENT,
    PRODUCTION
};