import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [text, setText] = useState("");

  // Backend URL
  const API = "https://todo-backend-7f1d.onrender.com";

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
  if (text.trim() === "") return;

  try {
    await fetch(`${API}/tasks/${encodeURIComponent(text)}`, {
      method: "POST",
    });

    setText("");
    fetchTasks();
  } catch (error) {
    console.log(error);
  }
};


  // Delete task
  const deleteTask = async (id: number) => {
  try {
    await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-10">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-10">
          Smart Todo 🚀
        </h1>

        {/* Input Section */}
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
            className="bg-cyan-400 text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition"
          >
            Add
          </button>

        </div>

        {/* Tasks */}
        <div className="space-y-4">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-gray-800 p-5 rounded-2xl flex justify-between items-center"
            >

              {/* Done + Text */}
              <div className="flex items-center gap-3">

                <input
                  type="checkbox"
                  className="w-5 h-5"
                />

                <p className="text-lg">
                  {task.text}
                </p>

              </div>

              {/* Delete */}
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 px-4 py-2 rounded-xl hover:scale-105 transition"
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