import { useNavigate, useParams } from 'react-router-dom';
import useFetch from './useFetch.js'


const TaskDetails = () => {
    const { id } = useParams();
    const { data: task, error, isPending } = useFetch('http://localhost:5001/tasks/' + id);
    const navigate = useNavigate();
    const handleClick= () => {
        fetch('http://localhost:5001/tasks/' + task._id, {
            method: 'DELETE'
        }).then(() => { 
            navigate("/");
        })
    }

    return (  
        <div className="task-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { task && (
                <article>
                    <h2>Task details - { task.title }</h2>
                    <div>{ task.body }</div>
                    <p>Status: { task.status }</p>
                    <p>DEADLINE: { task.time }</p>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
    );
}
 
export default TaskDetails;