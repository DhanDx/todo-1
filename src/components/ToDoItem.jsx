import { useState } from "react";

function ToDoItem({ todo, deleteTodo, toggleComplete, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim() === "") return;
    editTodo(todo.id, editText.trim());
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="todo-checkbox"
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="todo-edit-input"
          autoFocus
        />
      ) : (
        <span className="todo-text">{todo.text}</span>
      )}

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="btn btn-save">
              Save
            </button>
            <button
              onClick={() => {
                setEditText(todo.text);
                setIsEditing(false);
              }}
              className="btn btn-cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-edit"
            disabled={todo.completed}
          >
            ✏️
          </button>
        )}
        <button onClick={() => deleteTodo(todo.id)} className="btn btn-delete">
          🗑️
        </button>
      </div>
    </li>
  );
}

export default ToDoItem;
