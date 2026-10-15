import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('');
    const [time, setTime] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [isPending, setIsPending] = useState(true);

    // Latest data
    useEffect(() => {
        fetch(`http://localhost:5001/tasks/${id}`)
            .then(res => {
                    return res.json();
            })
            .then(data => {
                setTitle(data.title);
                setBody(data.body)
                setStatus(data.status)
                setTime(data.time);
                setIsPending(false);
            })
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { title, body, time, status }
        fetch(`http://localhost:5001/tasks/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        }).then(() => {
            navigate("/");
        })
    }

    return ( 
        <div className="edit">
            <h2>Edit Task</h2>
            {!isPending && (
                <form onSubmit={handleSubmit}>
                    <label>Task title: </label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Task body: </label>
                    <textarea
                        required
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <label>Task time: </label>
                    <input
                        type="text"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <label>Task time: </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Not done">Not done</option>
                        <option value="Done">Done</option>
                    </select>
                    <button>Edit this Task</button>
                </form>
            )}
        </div>
    );
}
 
export default Edit;