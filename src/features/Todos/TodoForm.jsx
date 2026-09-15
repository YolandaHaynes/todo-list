import { useRef, useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  const todoTitleRef = useRef(null);

  const isValid = isValidTodoTitle(workingTodoTitle);

  const handleAddTodo = (event) => {
    event.preventDefault();

    const todoTitle = workingTodoTitle.trim();

    if (isValidTodoTitle(todoTitle)) {
      onAddTodo(todoTitle);
      setWorkingTodoTitle('');
      todoTitleRef.current?.focus();
    }
  };

  return (
    <form className="todo-form" onSubmit={handleAddTodo}>
      <div className="todo-input-group">
        <TextInputWithLabel
          elementId="todoTitle"
          labelText="Todo"
          placeholder="Enter a new todo"
          ref={todoTitleRef}
          value={workingTodoTitle}
          onChange={(event) => setWorkingTodoTitle(event.target.value)}
          maxLength={100}
        />

        <button
          type="submit"
          className="primary-button"
          disabled={!isValid}
        >
          Add
        </button>
      </div>

      <p className="input-help">
        {workingTodoTitle.length}/100 characters
      </p>

      {workingTodoTitle && !isValid && (
        <p className="validation-message" role="alert">
          Please enter a todo between 1 and 100 characters.
        </p>
      )}
    </form>
  );
}

export default TodoForm;