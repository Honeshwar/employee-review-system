//env =   environment variable

const DEVELOPMENT = {
    port:8000,
    mongodbUrl:"mongodb://127.0.0.1:27017/EMPLOYEE_REVIEW_SYSTEM_DEVELOPMENT",
    mongodbUrlForSessionStore:"mongodb://127.0.0.1:27017/EMPLOYEE_SESSION_DEVELOPMENT"
};
const PRODUCTION = {};

module.exports = {DEVELOPMENT,PRODUCTION};// single export only work , require() get this obj directly without key