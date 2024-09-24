export default async () => {
    const app = document.getElementById("app");

    let html = /*html*/ `
        <div class="auth-container">
            <div class="login">
                <h1>TODO</h1>
                <h2>Login</h2>
                
                <input id="username" type="text" placeholder="username">
                <input id="password" type="password" placeholder="password">

                <button id="login">Login</button>
                <a href="/signup">signup</a>
            </div>
            <div id="message"></div>
            <a href="https://github.com/codingiseasylol/todo" target="_blank">Github Code</a>
        </div>
    `;

    app.innerHTML = html;

    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    let loginButton = document.getElementById("login");

    let messageElement = document.getElementById("message");

    usernameInput.focus();

    usernameInput.addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
            login();
        }
    });

    loginButton.addEventListener("click", async () => {
        login();
    });

    async function login() {
        let username = usernameInput.value;
        let password = passwordInput.value;

        if (username && password) {
            let response = await fetch("/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.status === 204) {
                page("/");
                return;
            } else {
                let result = await response.json();
                messageElement.innerText = result.message;
            }
        } else {
            messageElement.innerText = "Please provide username and password";
        }
    }
};
