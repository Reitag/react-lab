import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { useEffect, useState } from 'react';

export default function App() {
  const localStorageVar = 'todo';

  const [todo, setTodo] = useState(() => {
    const savedTodos = localStorage.getItem(localStorageVar);

    if (savedTodos) {
      return JSON.parse(savedTodos);
    }

    return [];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem(localStorageVar, JSON.stringify(todo));
  }, [todo]);

  const deleteTask = (taskId) => {
    const newTodo = todo.filter((task) => task.id !== taskId);
    setTodo(newTodo);
  };

  const deleteCompletedTasks = () => {
    const newTodo = todo.filter((task) => task.done !== true);
    setTodo(newTodo);
  };

  const toggleTaskComplete = (taskId, done) => {
    const newTodo = todo.map((task) => {
      if (task.id === taskId) {
        task.done = done;
      }
      return task;
    });
    setTodo(newTodo);
  };

  const addTask = () => {
    if (newTask.trim().length > 0) {
      const newToDo = {
        id: crypto?.randomUUID() ?? Date.now.toString(),
        text: newTask,
        done: false,
      };

      setTodo([...todo, newToDo]);
      setNewTask('');
    }
  };

  return (
    <main>
      <TaskForm addTask={addTask} newTask={newTask} setNewTask={setNewTask} />
      <TaskList
        tasks={todo}
        onDelete={deleteTask}
        onTaskComplete={toggleTaskComplete}
        deleteCompletedTasks={deleteCompletedTasks}
      />
    </main>
  );
}
