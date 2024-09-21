import Login from "./auth/Login.js";
import Signup from "./auth/Signup.js";

import Header from "./layout/Header.js";

import Todos from "./pages/Todos.js";
import User from "./pages/User.js";

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

async function logout() {
    await fetch("/auth/logout");
    page("/login");
}

page("/logout", logout);

page();
