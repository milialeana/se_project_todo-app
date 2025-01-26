class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  updateCompleted = (increment) => {
    this._completed = Math.max(0, this._completed + (increment ? 1 : -1));
    this._updateText();
  };

  updateTotal = (increment) =>
    this._updateText((this._total += increment ? 1 : -1));

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
