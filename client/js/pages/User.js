import { fetchGet, fetchPatch } from "../utils/utilsFetch.js";

export default async () => {
    const container = document.getElementById("container");

    let user = await fetchGet("/api/user");

    let html = /*html*/ `
        <div class="reset">
            <h1>User</h1>
            <h2>${user.username}</h2>

            <input id="password" type="password" placeholder="new password">
            <input id="password-repeat" type="password" placeholder="repeat">

            <button id="reset">Reset</button>
            <div id="message"></div>
        </div>
    `;

    container.innerHTML = html;

    let passwordInput = document.getElementById("password");
    let passwordRepeatInput = document.getElementById("password-repeat");

    let resetButton = document.getElementById("reset");

    let messageElement = document.getElementById("message");

    passwordInput.focus();

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

    resetButton.addEventListener("click", async () => {
        reset();
    });

    async function reset() {
        let password = passwordInput.value;
        let passwordRepeat = passwordRepeatInput.value;

        if (password && passwordRepeat && password == passwordRepeat) {
            let result = await fetchPatch(`/api/user/password`, { password });

            messageElement.innerText = result.message;
        }
    }
};
