export default async () => {
    const app = document.getElementById("app");

    let html = /*html*/ `
        <div class="auth-container">
            <div class="signup">
                <h1>TODO</h1>
                <h2>Signup</h2>
                
                <input id="username" type="text" placeholder="username">
                <input id="password" type="password" placeholder="password">
                <input id="password-repeat" type="password" placeholder="repeat">

                <button id="signup">Signup</button>
                <a href="/login">login</a>
            </div>
            <div id="message"></div>
            <a href="https://github.com/codingiseasylol/todo" target="_blank">Github Code</a>
        </div>
    `;

    app.innerHTML = html;

    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");
    let passwordRepeatInput = document.getElementById("password-repeat");

    let signupButton = document.getElementById("signup");

    let messageElement = document.getElementById("message");

    usernameInput.focus();

    usernameInput.addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
            passwordRepeatInput.focus();
        }
    });

    passwordRepeatInput.addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
            signup();
        }
    });

    signupButton.addEventListener("click", async () => {
        signup();
    });

    async function signup() {
        let username = usernameInput.value;
        let password = passwordInput.value;
        let passwordRepeat = passwordRepeatInput.value;

        if (username && password && passwordRepeat && password == passwordRepeat) {
            let response = await fetch("/auth/signup", {
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
