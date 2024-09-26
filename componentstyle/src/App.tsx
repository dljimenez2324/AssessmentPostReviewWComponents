import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

// shaping our Tasks here
interface Task {
  id: number;
  text: string;
  complete: boolean
}

// notice there are no props because the parent is not getting info  its giving information to children

const storageKey = "Tasks";

const App = () => {
  


  // useStates for managing tasks, input and edit mode
  const [task, setTask] = useState<Task[]>(() => {
    const storedTask = localStorage.getItem(storageKey);
    return storedTask ? JSON.parse(storedTask) : [];
  });
  const [input, setInput] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // load tasks from local storage

  // the useEffect will run what's inside as soon as the app component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem(storageKey);

    if (storedTasks) {
      setTask(JSON.parse(storedTasks));
    }
  }, []);

  // this will set the tasks to our localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(task));

    // save tasks to localStorage whenever tasks change
  }, [task]);

  // functions will go below here -----------------

  ///  function to add (save) or update (edit) a task
  const addTask = () => {
    if (input === "") return;

    if (editingId !== null) {
      const updateTasks = task.map((task) =>
        task.id === editingId ? { ...task, text: input } : task
      );
      setTask(updateTasks);
      setEditingId(null);
      setInput("");
    } else {
      // adding a new task  NOTICE we are having to say we have a new variable type Task and we MUST give the object the shape of the interface but give it the useState variable or values
      const newTask: Task = {
        id: Date.now(),
        text: input.trim(),
        complete: false,
      };
      setTask([newTask, ...task]);
      setInput("");
    }
  };

  /// function to start editing a task
  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setInput(text);
  };

  /// function to stop editing if canceling
  const cancelEdit = () => {
    setEditingId(null);
    setInput("");
  };

  /// function to delete a task
  const deleteTask = (id: number) => {
    const deleteItem = task.filter((task) => task.id !== id);
    setTask(deleteItem);
  };

  /// function to toggle a task complete status (complete or pending (not done))
  const toggleComplete = (id: number) => {
    const updateTasks = task.map((task) =>
      task.id === id ? { ...task, complete: !task.complete } : task
    );
    setTask(updateTasks);
  };

  return (
    <>
        <h1 className="text-center">Task App with Components</h1>
        <div className="container">
          <div className="row">
            <h1 className="text-center">My Tasks</h1>
            <div className="col">
              <TaskForm
                  input={input}
                  setInput={setInput}
                  editingId={editingId}
                  addTask={addTask}
                  cancelEdit={cancelEdit}
              />
            </div>
            <div className="col-12">
              <TaskList
                  tasks={task}
                  deleteTask={deleteTask}
                  startEditTask={startEditing}
                  toggleComplete={toggleComplete}
              />
            </div>
          </div>
        </div>
    </>
  )
}

export default App