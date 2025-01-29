import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const handleCheck = (isCompleted) => todoCounter.updateCompleted(isCompleted);
const handleDelete = () => todoCounter.updateTotal(false);

const renderTodo = (data) =>
  section.addItem(
    new Todo(data, "#todo-template", handleCheck, handleDelete).getView()
  );

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: ({ name, date }) => {
    const newTodo = {
      name,
      date: date ? new Date(date).toISOString().split("T")[0] : "",
      id: uuidv4(),
    };

    renderTodo(newTodo);
    todoCounter.updateTotal(true);
  },
});

addTodoPopup.setEventListeners();
addTodoButton.addEventListener("click", () => addTodoPopup.open());

new FormValidator(validationConfig, addTodoForm).enableValidation();
