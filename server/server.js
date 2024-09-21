let express = require("express");
let cookieParser = require("cookie-parser");

let config = require("./config.js");
let middleware = require("./middleware.js");

let login = require("./auth/login");
let signup = require("./auth/signup");
let logout = require("./auth/logout");

let todos = require("./api/todos.js");
let user = require("./api/user.js");

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(login)
    .use(signup)
    .use(logout)

    .use(middleware.authenticationMiddleware)

    .use(user)
    .use(todos)

    .use(middleware.errorMiddleware);

app.listen(config.port, () => {
    console.log(`listening on port: ${config.port}`);
});
