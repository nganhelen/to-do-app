import TaskList from './TaskList';
import useFetch from './useFetch';

const Home = () => {
    const { data: tasks, setData: setTasks, isPending, error } = useFetch('http://localhost:5001/tasks');

    const changeStatus = (id) => {
        const task = tasks.find(task => task._id === id);

        fetch(`http://localhost:5001/tasks/${task._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: task.status === 'Done' ? 'Not done' : 'Done'
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw Error("Could not update task");
                }
                setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task._id === id
                            ? { ...task, status: task.status === 'Done' ? 'Not done' : 'Done' }
                            : task
                    )
                );
            })
    };

    return (
        <div className="home">
            <h1>TO-DO LIST</h1>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {tasks && <TaskList tasks={tasks} setTasks={setTasks} changeStatus={changeStatus} />}
        </div>
    );
}

export default Home;