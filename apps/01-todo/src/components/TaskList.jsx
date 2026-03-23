import { useState } from 'react';
import TaskItem from './TaskItem';

export default function TaskList(props) {
  const { tasks, onDelete, onTaskComplete, deleteCompletedTasks } = props;
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return task.done !== true;
    }
    if (filter === 'completed') {
      return task.done !== false;
    }
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.done === true).length;

  return (
    <>
      <div>
        <button
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      {tasks.length > 0 ? (
        <ul>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} onDelete={onDelete} onTaskComplete={onTaskComplete} {...task} />
          ))}
        </ul>
      ) : (
        <div>No tasks yet</div>
      )}
      <div>Totatl tasks: {totalTasks}</div>
      <div>Completed tasks: {completedTasks}</div>
      <button onClick={() => deleteCompletedTasks()}>Clear completed</button>
    </>
  );
}
