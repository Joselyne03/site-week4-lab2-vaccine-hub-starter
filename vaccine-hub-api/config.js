require ("dotenv").config()

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001

function getDatabaseUri(){
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "vaccine_hub"
    // dbName passes as a database 
    // they will provide a URL
    // otherwise we create it ourself
    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
    // the format is usually: 
    //postgresql://<username>:<password>@<hostname>:<port>/<database-name> 
}

const BCRYPT_WORK_FACTOR = 13;

//console.log("process.env", Object.keys(process.env));
console.log("vaccine_hub Config:");
console.log("PORT:", PORT);
console.log("The database URL: ", getDatabaseUri());
console.log("-------");

module.exports = {
    PORT,
    getDatabaseUri,
    BCRYPT_WORK_FACTOR
}