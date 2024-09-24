let express = require("express");
let router = express.Router();
let SHA256 = require("crypto-js/sha256");
let config = require("../config");
let pool = require("../pool");
let jwt = require("jsonwebtoken");

router.post("/auth/login", async (req, res, next) => {
    try {
        let { username, password } = req.body;

        let query = `
            select *
            from user
            where username = ? and passwordHash = ?
            ;
        `;

        let passwordHash = SHA256(password).toString();

        let userResult = await pool.query(query, [username, passwordHash]);

        let user = userResult[0];

        if (user) {
            let token = jwt.sign(
                {
                    userId: user.id,
                },
                config.tokenSecret,
                {
                    expiresIn: "30d",
                }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // Ensures the cookie is sent only over HTTPS (use only in production)
            });

            res.sendStatus(204);
        } else {
            throw {
                type: "error",
                message: "Wrong username or password",
            };
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
