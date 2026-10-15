import { useState } from "react";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [time, setTime] = useState('');
    const [add, setAdd] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { title, body, time, status: "Not done" }
        fetch('http://localhost:5001/tasks', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        }).then(() => {
            setTitle('');
            setBody('');
            setTime('');
            setAdd(false);
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Task</h2>
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
                <button onClick={() => setAdd(true)}>Add Task</button>
            </form>
            { add && <p>Task has been added.</p> }
        </div>
    );
}
 
export default Create;