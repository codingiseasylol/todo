let jwt = require("jsonwebtoken");
let config = require("./config");

module.exports.authenticationMiddleware = (req, res, next) => {
    let token = req.cookies.token;

    jwt.verify(token, config.tokenSecret, (err, decoded) => {
        if (err) {
            res.status(401).send({
                status: 401,
                message: "No access!",
            });
        } else {
            req.userId = decoded.userId;
            next();
        }
    });
};

module.exports.errorMiddleware = (err, req, res, next) => {
    let status = err.status || 500;
    console.log(err);
    res.status(status).send(err);
};
