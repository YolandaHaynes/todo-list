import TodoListItem from "./TodoListItem";


function TodoList({ onCompleteTodo, todoList, onUpdateTodo, dataVersion}) {
  return (
    todoList.length === 0 ? (<p>Add todo above to get started</p>) : (
    <ul>{todoList.map(todo => <TodoListItem 
      key={todo.id} 
      todo={todo} 
      onCompleteTodo={onCompleteTodo} 
      onUpdateTodo={onUpdateTodo} 
      dataVersion={dataVersion}/>)}
    </ul>)
    );
}

export default TodoList;