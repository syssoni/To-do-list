import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faArrowUp, faArrowDown, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'

function ToDoList(){
    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState("");


    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){
        if(newTask.trim() === "")
            return;
        setTask(t => [...t, newTask]);
        setNewTask("")
    }

    function removeTask(id){
        setTask(t => t.filter((_, i) => i !== id));
    }

    function moveTaskUp(index){
        if(index === 0)
            return;
        const updatedTasks = [...task];
        [updatedTasks[index - 1], updatedTasks[index]] =
        [updatedTasks[index], updatedTasks[index - 1]];

        setTask(updatedTasks);
    }

    function moveTaskDown(index){
        if(index === task.length - 1)
            return;
        const updatedTasks = [...task];
        [updatedTasks[index + 1], updatedTasks[index]] =
        [updatedTasks[index], updatedTasks[index + 1]]

        setTask(updatedTasks);
    }

    function editTask(index){
        setEditIndex(index);
        setEditText(task[index]);
    }

    function saveEdit(){
        const updatedTasks = [...task];
        updatedTasks[editIndex] = editText;
        setTask(updatedTasks);
        setEditIndex(null);
    }

    return(<div className="to-do-list">
                <h1>To Do List</h1>
                <div className="upper-area">
                    <input type="text" 
                            id="input-task" 
                            placeholder="Enter a task"
                            value = {newTask}
                            onChange={handleInputChange} />

                    <button className="add-button" 
                            onClick={addTask}>Add</button>
                </div>
                <ol>
                    {task.map((item, index) => (
                        <li className="task-area" key={index}>
                            {editIndex === index ? (
                                <>
                                    <input type="text" value = {editText} onChange={(e)=>setEditText(e.target.value)} />
                                <button onClick={saveEdit}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                                </>
                            ):(<>
                                <span className="text">{item}</span>
                                <button className="delete-button" onClick={() => removeTask(index)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button className="edit-button" onClick={() => editTask(index)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="move-button" onClick={() => moveTaskUp(index)}>
                                    <FontAwesomeIcon icon={faArrowUp} />
                                </button>
                                <button className="move-button" onClick={() => moveTaskDown(index)}>
                                    <FontAwesomeIcon icon={faArrowDown} />
                                </button>
                                </>
                            )}    
                        </li>
                    ))}
                </ol>
    </div>);
}

export default ToDoList