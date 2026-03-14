export default function TaskForm(props) {
  const { addTask, newTask, setNewTask } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    addTask();
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="task-from">Новая задача </label>
      <input
        type="text"
        id="task-from"
        value={newTask}
        onInput={(event) => setNewTask(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
