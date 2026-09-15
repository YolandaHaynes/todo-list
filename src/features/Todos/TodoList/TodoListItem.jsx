import { useRef, useState } from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../../utils/todoValidation";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);

  const [workingTitle, setWorkingTitle] = useState(todo.title);

  const todoTitleRef = useRef(null);

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);
  };

  const handleStartEditing = () => {
    setWorkingTitle(todo.title);
    setIsEditing(true);
  };

  const handleUpdate = (event) => {
    if (!isEditing) return;
    event.preventDefault();

    const updatedTitle = workingTitle.trim();
    if (!isValidTodoTitle(updatedTitle)) return;
    onUpdateTodo({ ...todo, title: updatedTitle });
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.isCompleted ? "completed" : ""}`}>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <TextInputWithLabel
            elementId={`todoTitle${todo.id}`}
            labelText="Todo"
            ref={todoTitleRef}
            value={workingTitle}
            onChange={handleEdit}
            maxLength={100}
          />
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" disabled={!isValidTodoTitle(workingTitle)}>
            Update
          </button>
        </form>
      ) : (
        <div className="todo-item-content">
          <label className="todo-checkbox-label">
            <input
              type="checkbox"
              id={`checkbox${todo.id}`}
              checked={todo.isCompleted}
              onChange={() => onCompleteTodo(todo.id)}
            />
            <span className="custom-checkbox"></span>
            <span className="todo-title">{todo.title}</span>
          </label>

          <div className="todo-actions">
            <button
              type="button"
              className="edit-button"
              onClick={handleStartEditing}
              aria-label={`Edit ${todo.title}`}
            >
              Edit
            </button>

            <button
              type="button"
              className="delete-button"
              onClick={() => onDeleteTodo(todo.id)}
              aria-label={`Delete ${todo.title}`}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoListItem;
