 import { useEffect, useReducer } from 'react';
 import TodoForm from './TodoForm'
 import TodoList from './TodoList/TodoList'
 import SortBy from '../../shared/SortBy'
 import useDebounce from '../../utils/useDebounce';
 import FilterInput from '../../shared/FilterInput';
 import { todoReducer, initialTodoState, TODO_ACTIONS } from '../../reducers/todoReducer';
 
 function TodosPage({ token }){

  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const {
    todoList,
    error,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
    filterError,
  } = state;

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  const handleFilterChange = (newTerm) => { dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: { filterTerm: newTerm } });};

  const handleSortByChange = (newSortBy) => { dispatch({type: TODO_ACTIONS.SET_SORT,payload: {sortBy: newSortBy,sortDirection,},});};

  const handleSortDirectionChange = (newSortDirection) => {dispatch({type: TODO_ACTIONS.SET_SORT,payload: {sortBy,sortDirection: newSortDirection,},});};

  async function updateTodo (editedTodo) {

    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    if (!originalTodo) {
      return;
    }
    dispatch({ type: TODO_ACTIONS.UPDATE_TODO_START, payload: { id: editedTodo.id, title: editedTodo.title } });

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
        
        dispatch({ type: TODO_ACTIONS.UPDATE_TODO_SUCCESS});

      } catch (error) {
        dispatch({type: TODO_ACTIONS.UPDATE_TODO_ERROR, 
          payload: {
            id: editedTodo.id,
            originalTodo,
            error: `Error: ${error.message}`,
          },
});
      }
  }

  async function addTodo(todoTitle){

    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    }

    dispatch({ type: TODO_ACTIONS.ADD_TODO_START, payload: newTodo });

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
      dispatch({ type: TODO_ACTIONS.ADD_TODO_SUCCESS, payload:{tempId: newTodo.id, todo:data} });

    } catch (error){
      dispatch({ type: TODO_ACTIONS.ADD_TODO_ERROR, payload: { id: newTodo.id, error: `Error: ${error.message}` } });
    } 
  }

  async function completeTodo (id){
    const originalTodo = todoList.find((todo) => todo.id === id);

    if (!originalTodo) {
      return;
    }
    dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_START, payload: { id } });
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
    
      dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS});
    } catch (error) {
      dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_ERROR, payload: { id, originalTodo, error: `Error: ${error.message}` } });

    }
  }

  useEffect(() => {
    async function fetchTodos(){

      dispatch({ type: TODO_ACTIONS.FETCH_START });

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
        dispatch({ type: TODO_ACTIONS.FETCH_SUCCESS, payload: data.tasks });
        
      } catch(error){
        if (debouncedFilterTerm || sortBy !== 'createdAt' || sortDirection !== 'desc') {
          dispatch({ type: TODO_ACTIONS.FETCH_ERROR, payload: { error: "",filterError: `Error filtering/sorting todos: ${error.message}` } });
        } else { 
          dispatch({ type: TODO_ACTIONS.FETCH_ERROR, payload: { error: `Error fetching todos: ${error.message}` , filterError: "" } });
        }
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
          <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}>Clear Error</button>
        </div>
      )}
      {filterError && (
          <div>
            <p>{filterError}</p>
            <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })}>Clear Filter Error</button>
            <button onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}>Reset Filters</button>
          </div>
        )}
      {isTodoListLoading && <p>Loading todos.....</p>}
      <SortBy sortBy={sortBy} sortDirection={sortDirection} onSortByChange={handleSortByChange} onSortDirectionChange={handleSortDirectionChange}/>
      <FilterInput filterTerm={filterTerm} onFilterChange={handleFilterChange}/>
      <TodoForm onAddTodo={addTodo }/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} dataVersion={dataVersion}/>
    </div>
  )
}
  
export default TodosPage;