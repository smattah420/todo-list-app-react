import { useState } from 'react';

const FILTERS = ['All', 'Active', 'Completed'];

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'This is task 1', done: false },
    { id: 2, text: 'This is task 2', done: false }
  ]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredTasks =
    filter === 'Active'
      ? tasks.filter((task) => !task.done)
      : filter === 'Completed'
      ? tasks.filter((task) => task.done)
      : tasks;

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks((current) => [...current, { id: Date.now(), text, done: false }]);
    setInput('');
  };

  const toggleDone = (id) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const removeTask = (id) => setTasks((current) => current.filter((task) => task.id !== id));

  return (
    <div className="page-shell">
      <div className="todo-card">
        <h1>To-Do List</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask} aria-label="Add task">
            +
          </button>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {FILTERS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty-state">No tasks found</p>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className="task-item">
                <span className={task.done ? 'task-text done' : 'task-text'}>
                  {task.text}
                </span>
                <div className="task-actions">
                  <button
                    className="complete-button"
                    onClick={() => toggleDone(task.id)}
                    aria-label="Mark task complete"
                  >
                    ✓
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => removeTask(task.id)}
                    aria-label="Delete task"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
