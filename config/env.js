//env =   environment variable
//Development environment variable
const DEVELOPMENT = {
    port:7000,
    mongodbUrl:"mongodb://127.0.0.1:27017/EMPLOYEE_REVIEW_SYSTEM_DEVELOPMENT",
    session_secret:'blahblahblah',
    admin:{
        admin_token:'12345',
    }
};
//Production environment variable
const PRODUCTION = {};

module.exports = {
    DEVELOPMENT,
    PRODUCTION
};