//env =   environment variable

const DEVELOPMENT = {
    port:7000,
    mongodbUrl:"mongodb://127.0.0.1:27017/EMPLOYEE_REVIEW_SYSTEM_DEVELOPMENT",
    mongodbUrlForSessionStore:"mongodb://127.0.0.1:27017/EMPLOYEE_SESSION_DEVELOPMENT",
    session_secret:'blahblahblah',
    admin:{
        email:'admin123@gmail.com',
        passport:"1"
    }
};
const PRODUCTION = {};

module.exports = {DEVELOPMENT,PRODUCTION};// single export only work , require() get this obj directly without key