import { useState } from "react";
import ToDoItem from "./ToDoItem";

function ToDoList({ todos, addTodo, deleteTodo, toggleComplete, editTodo }) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    addTodo(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  const pending = todos.filter((t) => !t.completed).length;

  return (
    <div className="todo-list-container">
      <div className="add-todo">
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="todo-input"
        />
        <button onClick={handleAdd} className="btn btn-add">
          + Add
        </button>
      </div>

      <div className="todo-stats">
        <span>{todos.length} total</span>
        <span>{pending} pending</span>
        <span>{todos.length - pending} done</span>
      </div>

      {todos.length === 0 ? (
        <p className="empty-msg">🎉 No tasks! Enjoy your day.</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
              editTodo={editTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ToDoList;
