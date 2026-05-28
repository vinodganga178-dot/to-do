import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [text, setText] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    const res = await fetch(
      "https://todo-backend-7f1d.onrender.comtasks"
    );

    const data = await res.json();

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task permanently
  const addTask = async () => {
    if (text.trim() === "") return;

    await fetch(
      `https://todo-backend-7f1d.onrender.com${text}`,
      {
        method: "POST",
      }
    );

    setText("");

    fetchTasks();
  };

  // Delete permanently
  const deleteTask = async (id: number) => {
    await fetch(
      `https://todo-backend-7f1d.onrender.com{id}`,
      {
        method: "DELETE",
      }
    );

    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-10">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-10">
          Smart Todo 🚀
        </h1>

        <div className="flex gap-4 mb-8">

          <input
            type="text"
            placeholder="Enter task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 p-4 rounded-2xl bg-gray-800 border border-cyan-400 outline-none"
          />

          <button
            onClick={addTask}
            className="bg-cyan-400 text-black px-6 py-3 rounded-2xl font-bold"
          >
            Add
          </button>

        </div>

        <div className="space-y-4">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-gray-800 p-5 rounded-2xl flex justify-between items-center"
            >

              <p className="text-lg">{task.text}</p>

              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 px-4 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default App;