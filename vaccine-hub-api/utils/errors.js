class ExpressError extends Error {
    constructor (message,status){
        super();
        this.message = message;
        this.status = status;
    }
}

class BadRequestError extends Error {
    constructor(message = "Bad Request"){
        super (message, 400);
    }
}
class UnauthorizedError extends Error {
    constructor(message = "Unauthorized"){
        super (message, 401);
    }
}
class ForbiddenError extends Error {
    constructor(message = "Forbidden"){
        super (message, 403);
    }
}
class NotFoundError extends Error {
    constructor(message = "Not Found"){
        super (message, 404);
    }
}

module.exports = {
    ExpressError,
    BadRequestError,
    BadRequestError,
    UnauthorizedError,
    NotFoundError,
}