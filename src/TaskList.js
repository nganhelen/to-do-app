import { Link } from 'react-router-dom';

const TaskList = ({tasks, setTasks, changeStatus}) => {
    const handleClick= (id) => {
        fetch('http://localhost:5001/tasks/' + id, {
            method: 'DELETE'
        })
        .then(() => {
            const newTasks = tasks.filter(task => task._id !== id);
            setTasks(newTasks);
        })
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <div className="task-preview" key={task._id}>
                    <Link className="edit-link" to={`/tasks/${task._id}/edit`} >
                        <span className="material-symbols-outlined">edit</span>
                    </Link>
                    
                    <Link className="task-details-link" to={`/tasks/${task._id}`}>
                        <p className="task">
                        <span className="time">{ task.time }</span>
                        <span className="body">{ task.title }</span>
                        <span className="status">{ task.status }</span>
                        </p>
                    </Link>

                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={task.status === 'Done'}
                            onChange={() => changeStatus(task._id)}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <button onClick={ () => handleClick(task._id)}>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            ))}
        </div>
    );
}
 
export default TaskList;