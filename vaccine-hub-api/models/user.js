const {Unauthorized, UnauthorizedError, BadRequestError} = require ("../utils/errors");
const db = require("../db");
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR} = require("../config")


class User {
    static async login(credentials){
        //here the info of teh user is taken in and looked up in teh Db
        //must throw an error if some fields are missing
        const requireFields = ["email", "password"]
        requireFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in the request body.`)
            }
        })
        //
        //on teh lookup search for teh user and then password
        const user = await User.fetchUserbyEmail(credentials.email);
        if(user){
          const isVaild = await bcrypt.compare(credentials.password, user.password);
          if(isVaild){
            return user;
          }
        }

        //both must match up and return user 

        //if anything goes wrong throw an error of unauthorized
        throw new UnauthorizedError ("Invaild username/password");
    }
    static async register(credentials){
        //user shoudl submit all teh required fields
        //if any fields are missing throw an error 
        //make sure that the user doesnt exist in the bd =
        const requireFields = ["first_name","last_name","email", "password","location"]
        requireFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in the request body.`)
            }
        })

        if(credentials.email.indexOf("@") <= 0){
            throw new BadRequestError ("Invaild Email Address: Must include @ !")
        }
        const existingUser = await User.fetchUserbyEmail(credentials.email);
        if(existingUser){
            throw new BadRequestError(`The email: ${credentials.email} already exist`)
        }

        //if a user exist throw an error
        //take in password and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);
        //email must be store in lowercase
        const lowercaseEmail = credentials.email.toLowerCase();
        //create a new user in teh db with all the info and return the user.
        const result = await db.query(`
        INSERT INTO users(
            first_name,
            last_name,
            email,
            password,
            location
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id,first_name,last_name,email, password, location, date
        `, [credentials.first_name,credentials.last_name,lowercaseEmail,hashedPassword,credentials.location ])

        //return user
        const user = result.rows[0];
        return user;
    }
    static async fetchUserbyEmail(email){
        if(!email){
            BadRequestError("No email has been provided");
        }
        //the $1 is a query interpulation 
        const query = `SELECT * FROM users WHERE email = $1`
        //we store the resulst in this variables
        const result = await db.query(query, [email.toLowerCase()])
        //then return it in rows
        const user = result.rows[0]
        return user;

    }
}

module.exports = User;