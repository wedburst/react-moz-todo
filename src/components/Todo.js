import React, { useState } from "react";


export const Todo = ({name, completed, id, toggleTaskCompleted, deleteTask, editTask}) => {
  console.log(name, completed, id)
  const [isEditing, setIsEditing] = useState();
  const [newName, setNewName] = useState();

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, newName);
    setNewName("");
    setIsEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input 
          id={id} 
          className="todo-text" 
          type="text" 
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setIsEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={id}
            type="checkbox"
            defaultChecked={completed}
            onChange={() => toggleTaskCompleted(id)}
          />
          <label className="todo-label" htmlFor={id}>
            {name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn" onClick={() => setIsEditing(true)}>
            Edit <span className="visually-hidden">{name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => deleteTask(id)}
          >
            Delete <span className="visually-hidden">{name}</span>
          </button>
        </div>
    </div>
  );

  return (
    <>
    <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
     {/* <li className="todo stack-small">
       <div className="c-cb">
         <input id={id} type="checkbox" defaultChecked={completed} onChange={() => toggleTaskCompleted(id)} />
         <label className="todo-label" htmlFor={id}>
           {name}
         </label>
       </div>
       <div className="btn-group">
         <button type="button" className="btn">
           Edit <span className="visually-hidden">{name}</span>
         </button>
         <button type="button" className="btn btn__danger"
           onClick={() => deleteTask(id)}
         >
           Delete <span className="visually-hidden">{name}</span>
         </button>
       </div>
     </li> */}
    </>
  );
};

/*
  EMPEZAMOS A CREAR LA INTERFAZ DE USUARIO PARA EDITAR 
  1) integramos isEditing en un useState
  2) se integro editingTemplate y viewTemplate arriba de return
  3) se agrega setIsEditing() como funcion en editar
  4) se agrega onClick={() => setIsEditing(true)} en cancelar de la vista editingTemplate

  Editar desde la interfaz de usuario
  1) integramos newName a un useState
  2) aplicamos la funcion handleChange para establecer el nuevo nombre
  3) integramos el value newName y onchange con el nombre de la funcion handleChange
  4) se agrego la funcion de guardar handleSubmit
*/