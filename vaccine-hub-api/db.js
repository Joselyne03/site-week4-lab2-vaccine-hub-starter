//we are importing teh client from the pg package

const {Client} = require ("pg");
const {getDatabaseUri} = require("./config");

//create a new instance of this object
const db = new Client ({ connectionString: getDatabaseUri() })

//call a client connection method to callback that logs the information
db.connect((err)=>{
    if(err) {
        console.error("connection error", err.stack)
    }else{
        console.log("Successfully connected to postgres db")
    }
})

module.exports = db;