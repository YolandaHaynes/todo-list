import TodoListItem from "./TodoListItem";
import { useMemo } from "react";

function TodoList({ onCompleteTodo, todoList, onUpdateTodo, dataVersion}) {
  const filteredTodoList = useMemo(() => {
    console.log(`Recalculating filtered todos (v${dataVersion})`);
    return {
      version: dataVersion,
      todos: todoList.filter(todo => todo.isCompleted === false)
    };
  }, [todoList, dataVersion]);
  return (
    filteredTodoList.todos.length === 0 ? <p>Add todo above to get started</p> : <ul>{filteredTodoList.todos.map(todo => <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo} dataVersion={dataVersion}/>)}</ul>

    );
}

export default TodoList;