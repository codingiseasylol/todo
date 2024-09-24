let express = require("express");
let router = express.Router();

router.get("/auth/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        expires: new Date(0),
    });

    res.status(401).send({
        status: 401,
        message: "No access!",
    });
});

module.exports = router;
