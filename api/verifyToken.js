const jwt = require("jsonwebtoken");

//the function for the verification of the token (via header/not body)
function verify (req, res, next) {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        //to check if the token is or is not valid/expired/modified
        jwt.verify(token, process.env.SECRET_KEY,(err, user) => {
            if(err) res.status(403).json("Token is not valid!");
            req.user = user;
            next(); // the way to go to actual router
        });
        //if there is an action which should be verified by a token, but it is not allowed for a user to proceed
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}

module.exports = verify;