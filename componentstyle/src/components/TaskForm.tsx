
interface TaskFormProps {
    input: string;
    setInput: (value: string) => void;
    editingId: number | null;
    addTask: () => void;
    cancelEdit: () => void;

}

const TaskForm = ({input, setInput, editingId, addTask, cancelEdit}:TaskFormProps) => {



  return (
    <>
        {/* <h1>This is our Task Form Component</h1> */}
        <div className="row">
            <div className="col-9">
                <input 
                    type="text" 
                    className="form-control" 
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    placeholder="Add a Task"
                />
            </div>

            <div className="col">
                <button onClick={addTask} className="btn btn-outline-primary">{editingId !== null ? "Update" : "Add"} Task </button>
            </div>
            <div className="col">
                {editingId !== null && <button onClick={cancelEdit} className="btn-outline-warning">Cancel Edit</button>}
            </div>

        </div>
    </>
  )
}

export default TaskForm