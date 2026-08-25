 import {useState, useEffect, useCallback } from 'react';
 import TodoForm from './TodoForm'
 import TodoList from './TodoList/TodoList'
 import SortBy from '../../shared/SortBy'
 import useDebounce from '../../utils/useDebounce';
 
 function TodosPage({ token }){

  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterTerm, setFilterTerm] = useState('');
  const debouncedFilterTerm = useDebounce(filterTerm, 300);
  const [dataVersion, setDataVersion] = useState(0)

  const handleFilterChange = (newTerm) => { setFilterTerm(newTerm);};

  const invalidateCache = useCallback(() =>{
      setDataVersion(prev => prev + 1);
      console.log("Invalidating memo cache after todo mutation")
  },[]);

  async function updateTodo (editedTodo) {

    setError("")
    
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    if (!originalTodo) {
      return;
    }

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
        
        invalidateCache();

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

      invalidateCache();

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

    if (!originalTodo) {
      return;
    }
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
      
      invalidateCache();
      
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

      const paramsObject = {
        sortBy,
        sortDirection,
        limit: 100
      };
      if (debouncedFilterTerm){
        paramsObject.find = debouncedFilterTerm;
      }
      const params = new URLSearchParams(paramsObject);

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
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);


    return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError("")}>Clear Error</button>
        </div>
      )}
      {isTodoListLoading && <p>Loading todos.....</p>}
      <SortBy sortBy={sortBy} sortDirection={sortDirection} onSortByChange={setSortBy} onSortDirectionChange={setSortDirection}/>
      <FilterInput filterTerm={filterTerm} onFilterChange={handleFilterChange}/>
      <TodoForm onAddTodo={addTodo }/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo}/>
    </div>
  )
}
  
export default TodosPage;