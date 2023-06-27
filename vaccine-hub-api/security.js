const bcrypt = require("bcrypt");
const pw = "secertpassword";

//this function creates a hased password
bcrypt.hash(pw,6,(err,hashedPw) => {
    if (err){
        console.error("Error hashing password: ",err);
    }else {
        console.log("Password has been hashed");
    }
    console.log(`Password: ${pw}`);
    console.log(`Hashed Password is ${hashedPw}`);
})
