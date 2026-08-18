 import {useState, useEffect } from 'react';
 import TodoForm from './TodoForm'
 import TodoList from './TodoList/TodoList'

 
 function TodosPage({ token }){

  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("")
  const [isTodoListLoading, setIsTodoListLoading] = useState(false)

  async function updateTodo (editedTodo) {

    setError("")
    
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    setTodoList((previous) => previous.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
      );

      try {
        const response = await fetch(`/api/tasks/${editedTodo.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
          body: JSON.stringify({ 
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted
          }),
        });

        if (response.status === 401) {
          throw new Error ('unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to update todo');
        }
      } catch (error) {
        setTodoList((previous) =>
          previous.map((todo) => (todo.id === editedTodo.id ? originalTodo : todo))
        );

      setError(`Error: ${error.message}`);
      }
  }

  async function addTodo(todoTitle){
    setError("")

    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    }

    setTodoList(previous => [newTodo, ...previous])

    try {
      const response = await fetch ('/api/tasks', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title:todoTitle,
          isCompleted: false,
        }),
      });

      if (response.status === 401){
        throw new Error("unauthorized");
      }
      if (!response.ok){
        throw new Error("Failed to add todo");
      }
      
      const data = await response.json();
      setTodoList((previous)=>
        previous.map((todo) => (todo.id === newTodo.id ? data : todo )));

    } catch (error){
      setTodoList((previous)=>
        previous.filter( todo => todo.id !== newTodo.id )
    );
    setError(`Error: ${error.message}`);
    } 
  }

  async function completeTodo (id){
    setError("")

    const originalTodo = todoList.find((todo) => todo.id === id);

    setTodoList(previous => previous.map(todo=> todo.id === id ? {...todo, isCompleted:true} : todo))
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({ isCompleted: true }),
      });

      if (response.status === 401) {
        throw new Error ('unauthorized');
      }

      if (!response.ok) {
        throw new Error('Failed to complete todo');
      }
    } catch (error) {
      setTodoList((previous) =>
        previous.map((todo) => (todo.id === id ? originalTodo : todo))
      );

    setError(`Error: ${error.message}`);
    }
  }

  useEffect(() => {
    async function fetchTodos(){

      setError("")

      setIsTodoListLoading(true)
      
      const params = new URLSearchParams({limit: 100});

        try{
          const response = await fetch(`/api/tasks?${params}`, {
            headers: {
              'X-CSRF-TOKEN': token,
            },
              credentials: 'include',
            });

          if (response.status === 401) {
            throw new Error ("unauthorized");
          } 
          if (!response.ok){
            throw new Error('Failed to fetch todos');
          }
          
          const data = await response.json()
          setTodoList(data.tasks);
        
        } catch(error){
          setError(`Error: ${error.message}`);
        } finally{
          setIsTodoListLoading(false)
        }
      }
      if(token){
        fetchTodos()
      }
    }, [token]);

      return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError("")}>Clear Error</button>
        </div>
      )}
      {isTodoListLoading && <p>Loading</p>}
      <TodoForm onAddTodo={addTodo }/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo}/>
    </div>
  )
}
  
export default TodosPage;