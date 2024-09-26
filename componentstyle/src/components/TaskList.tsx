import Tasks from "./Tasks";

// define the shape of the shape of the single task
interface Task {
    id: number;
    text: string;
    complete: boolean;
}

// Define the shape of the props that TaskList will receive
interface TaskListProps {
    tasks: Task[];
    deleteTask: (id: number) => void;
    startEditTask: (id: number, test: string) => void;
    toggleComplete: (id: number) => void
}

const TaskList = ({tasks, deleteTask, startEditTask, toggleComplete}:TaskListProps) => {
  return (
    /// Return the JSX (UI) to render the TaskList Component

    
    <>
        {/* <h1>TaskList Component</h1> */}
        {/* UL and map our <Task/>  pass in our props set these props eventually from parent component */}
        <ul className="list-group-mt-4" data-bs-theme="dark">
            {tasks.map((task) => (

                // Render the Tasks component for each task, we are passing task details and control functions as props
                //  the portion on the left of the = are the props  and the things on the right are what are being passed through
                <Tasks 
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    startEditTask={startEditTask} 
                    toggleComplete={toggleComplete}
                />
            ))}
        </ul>
    </>
  )
}

export default TaskList