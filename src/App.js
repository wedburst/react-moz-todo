import { useState } from "react";
import { FilterButton } from "./components/FilterButton";
import { Form } from "./components/Form";
import { Todo } from "./components/Todo";
import { nanoid } from "nanoid";
// filter
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);
console.log(FILTER_NAMES)

const arreglo = Object.entries(FILTER_NAMES)

for(const [key, value] of arreglo)
  console.log(`Answer ${key}: ${value}`);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const addTask = (name) => {
    // alert(name)
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  

  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    <Todo 
      key={task.id} 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  // para el titulo de la cantidad de task
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  // Filtrado para la linea 32 del componente filterButton.js

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    // console.log(id)
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {/* <FilterButton />
        <FilterButton />
        <FilterButton /> */}
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
       {/* <Todo name="Eat" completed={true} id="todo-0"/>
       <Todo name="Sleep" completed={false} id="todo-1"/>
       <Todo name="Repeat" completed={false} id="todo-2"/> */}
       {/* Linea 8 */}
       {taskList}
      </ul>
    </div>
  );
}

export default App;
