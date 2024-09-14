let express = require("express");
let router = express.Router();
let SHA256 = require("crypto-js/sha256");
let config = require("../config");
let pool = require("../pool");
let jwt = require("jsonwebtoken");

router.post("/auth/signup", async (req, res, next) => {
    try {
        let username = req.body.username.toLowerCase();
        let password = req.body.password;

        let userQuery = `
            select *
            from user
            where username = ?;
        `;

        let result = await pool.query(userQuery, [username]);

        let user = result[0];

        if (user) {
            throw {
                type: "info",
                message: "User already exists",
            };
        }

        let createUserQuery = `
            insert into user 
                (
                    username,
                    passwordHash,
                    created
                )
            values
                (
                    ?, 
                    ?, 
                    now() 
                )
        `;

        let passwordHash = SHA256(password).toString();

        let rows = await pool.query(createUserQuery, [username, passwordHash]);

        if (rows.insertId) {
            let token = jwt.sign(
                {
                    username: username,
                    userId: rows.insertId,
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
                message: "Signup failed",
            };
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
