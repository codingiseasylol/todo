let express = require("express");
let router = express.Router();
let SHA256 = require("crypto-js/sha256");
let pool = require("../pool");

router.get("/api/user", async (req, res, next) => {
    try {
        let userId = req.userId;

        let query = `
            select
                id,
                username
            from user
            where id = ?
            ;
        `;

        let rows = await pool.query(query, [userId]);

        res.status(200).send(rows[0]);
    } catch (err) {
        next(err);
    }
});

router.patch("/api/user/password", async (req, res, next) => {
    try {
        let { password } = req.body;
        let userId = req.userId;

        let passwordHash = SHA256(password).toString();

        let query = `
            update user
            set passwordHash = ?
            where id = ?
            ;
        `;

        let rows = await pool.query(query, [passwordHash, userId]);

        if (rows.changedRows) {
            res.status(200).send({
                type: "success",
                message: "password_changed_successfully",
            });
        } else {
            throw {
                type: "error",
                message: "password_change_failed",
            };
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
