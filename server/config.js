let path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

module.exports = {
    port: process.env.PORT,
    host: process.env.HOST,
    db: {
        connectionLimit: 100,
        server: "localhost",
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true,
        dateStrings: true,
    },
    tokenSecret: process.env.TOKEN_SECRET,
};
