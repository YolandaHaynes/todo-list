import { useRef, useState } from 'react';
import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../../utils/todoValidation';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
 
  const [isEditing, setIsEditing] = useState(false);

  const [workingTitle, setWorkingTitle] = useState(todo.title);

  const todoTitleRef = useRef(null);

  const handleCancel = () =>
    {
      setWorkingTitle(todo.title);
      setIsEditing(false);
    };

  const handleEdit = (event) => 
    {
      setWorkingTitle(event.target.value);
    };

  const handleStartEditing = () => {
    setWorkingTitle(todo.title);
    setIsEditing(true);
  };

  const handleUpdate = (event) => {
    if (!isEditing) return;
    event.preventDefault();
    onUpdateTodo({...todo, title: workingTitle});
    setIsEditing(false);
  }

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (<> <TextInputWithLabel
                            elementId={`todoTitle${todo.id}`}
                            labelText="Todo"
                            ref={todoTitleRef}
                            value={workingTitle}
                            onChange={handleEdit}
                          /> 
        <button type="button" onClick={handleCancel}> Cancel </button> 
        <button type="submit" disabled={!isValidTodoTitle(workingTitle)}> Update </button></>) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={()=> onCompleteTodo(todo.id)}
              />
           </label>
           <span onClick={handleStartEditing}> {todo.title} </span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem


//below is optional stretch goal of a custom hook 
// import { useState } from 'react';
// import TextInputWithLabel from '../../shared/TextInputWithLabel';
// import { isValidTodoTitle } from '../../utils/todoValidation';
// import { useEditableTitle } from '../../hooks/useEditableTitle'

// function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {

// const {
//   isEditing,
//   workingTitle,
//   startEditing,
//   cancelEdit,
//   updateTitle,
//   finishEdit
// } = useEditableTitle(todo.title);

// Update the event handlers:
// handleEdit becomes: (event) => updateTitle(event.target.value)
// handleCancel becomes: cancelEdit
// handleUpdate becomes: (event) => {
//   if (!isEditing) return;
//   event.preventDefault();
//   const finalTitle = finishEdit();
//   onUpdateTodo({ ...todo, title: finalTitle });
// }
// setIsEditing(true) becomes: startEditing()

// const handleUpdate = (event) => {
//   if (!isEditing) return;

//   event.preventDefault();

//   const finalTitle = finishEdit();

//   onUpdateTodo({
//     ...todo,
//     title: finalTitle
//   });
// };

//   return (
//     <li>
//       <form onSubmit={handleUpdate}>
//         {isEditing ? (<> <TextInputWithLabel value={workingTitle} onChange={(event) => updateTitle(event.target.value)} /> 
//         <button type="button" onClick={cancelEdit}> Cancel </button> 
//         <button type="button" onClick={handleUpdate} disabled={!isValidTodoTitle(workingTitle)}> Update </button></>) : (
//           <>
//             <label>
//               <input
//                 type="checkbox"
//                 id={`checkbox${todo.id}`}
//                 checked={todo.isCompleted}
//                 onChange={()=> onCompleteTodo(todo.id)}
//               />
//            </label>
//            <span onClick={startEditing}>{todo.title}</span>
//           </>
//         )}
//       </form>
//     </li>
//   );
// }

// export default TodoListItem