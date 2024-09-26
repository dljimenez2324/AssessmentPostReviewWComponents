

//interface to define the shape of the data. This interface will need an id, text, complete
interface Task {
    id: number;
    text: string;
    complete: boolean
}

//Props here we define our expected properties (props) The Task.tsx component (child) will receive data from TaskList.tsx
interface TaskProps {
    task: Task,
    deleteTask: (id:number) => void;
    startEditTask: (id: number, text: string) => void;
    toggleComplete: (id: number) => void
}

//This is our Task component where we pass our props as parameters in the parentheses 
// This component expects the TaskProps structure defined above in the interfaces
const Tasks = ({task, deleteTask, startEditTask, toggleComplete}:TaskProps) => {
  return (
    /// Everything insde here is JSX
    // The outermost element will be a list item <li> , representing a single task in a task list
    // We are going to render the 'completed' as a class if the ('task.complete') true   so a 'completed' class is applied to the styling showing completed task
    // We are going to go to our index.css and make sure that we have a completed class that does what we need. Strike text when the check box is clicked


    <>
        {/* <h1>TaskList Component</h1> */}

        <li className={`list-group-item d-flex justify-content-between ${task.complete ? "completed" : ""}`}>
            <div>
                {/* Checkbox that indicates task completed or not */}
                <input 
                    type="checkbox" 
                    className="form-check-input me-2" 
                    checked={task.complete}
                    onChange={() => toggleComplete(task.id)}
                />
                <span>
                    {task.text}
                </span>
            </div>

            <div>
                {/* The edit button triggers starting edit function with task id and text */}
                {/* This allows the parent component to initiate an editing task mode for the selected task */}
                {/*   */}
                <button onClick={() => startEditTask(task.id,task.text)} className="btn btn-outline-info m-2">Edit</button>
                <button onClick={() => deleteTask(task.id)} className="btn btn-outline-danger">Delete</button>
            </div>

        </li>
    </>
  )
}

export default Tasks