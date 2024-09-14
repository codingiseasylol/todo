import Login from "./auth/Login.js";
import Signup from "./auth/Signup.js";

import Header from "./layout/Header.js";

import Todos from "./pages/Todos.js";
import User from "./pages/User.js";

import Logout from "./auth/Logout.js";

const app = document.getElementById("app");

function containerMiddleware(ctx, next) {
    app.innerHTML = `
        ${Header}
        <div id="container" class="container"></div>
    `;

    next();
}

page("*", containerMiddleware);

page("/login", Login);
page("/signup", Signup);
page("/user", User);

page("/", Todos);

page("/logout", Logout);

page();
