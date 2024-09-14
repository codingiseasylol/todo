import { fetchGet, fetchPost, fetchPatch, fetchDelete } from "../utils/utilsFetch.js";

export default async () => {
    const container = document.getElementById("container");

    let html = /*html*/ `
        <div class="todos-container">
            <div class="form">
                <input type="text" id="input-todo-title" />
                <button id="button-todo-add">Add</button>
            </div>

            <div class="todos-wrapper">
                <div class="todos"></div>
                <div class="completed"></div>
            </div>
        </div>
    `;

    container.innerHTML = html;

    document.getElementById("button-todo-add").addEventListener("click", addTodo);
    document.getElementById("input-todo-title").addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
            addTodo();
        }
    });

    renderTodos();
};

let todos = [];

async function renderTodos() {
    todos = await fetchGet(`/api/todos`);

    let todosElement = document.querySelector(".todos");
    let completedElement = document.querySelector(".completed");

    todosElement.innerHTML = "";
    completedElement.innerHTML = "";

    todos.forEach((todo) => {
        let todoNode = document.createElement("div");
        todoNode.className = "todo";
        todoNode.setAttribute("data-id", todo.id);

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.addEventListener("change", toggleTodo);
        todoNode.append(checkbox);

        let title = document.createElement("span");
        title.innerText = todo.title;
        title.addEventListener("click", editTodo);
        todoNode.append(title);

        let remove = document.createElement("span");
        remove.innerText = "⨯";
        remove.className = "remove";
        remove.addEventListener("click", deleteTodo);
        todoNode.append(remove);

        if (todo.completed) {
            checkbox.checked = true;
            completedElement.append(todoNode);
        } else {
            todosElement.append(todoNode);
        }
    });
}

async function addTodo() {
    let titleInput = document.getElementById("input-todo-title");
    let title = titleInput.value;
    await fetchPost(`/api/todos`, { title: title });
    renderTodos();
    titleInput.value = "";
}

async function updateTodo(todo) {
    await fetchPatch(`/api/todos/${todo.id}`, todo);
    renderTodos();
}

async function deleteTodo(event) {
    let todo = getTodoFromEvent(event);

    await fetchDelete(`/api/todos/${todo.id}`);
    renderTodos();
}

function getTodoFromEvent(event) {
    let todoId = event.target.parentNode.getAttribute("data-id");
    let todo = todos.filter((todo) => todo.id == todoId)[0];
    return todo;
}

function toggleTodo(event) {
    let todo = getTodoFromEvent(event);

    todo.completed = event.target.checked;

    updateTodo(todo);
}

function editTodo(event) {
    let todo = getTodoFromEvent(event);

    let input = document.createElement("input");
    input.value = todo.title;

    event.target.replaceWith(input);
    input.focus();

    input.addEventListener("blur", (event) => {
        todo.title = event.target.value;
        updateTodo(todo);
    });

    input.addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
            todo.title = event.target.value;
            updateTodo(todo);
        }
    });
}
