import { useEffect, useState } from "react";
import "./App.css";

function App() {
  if (!localStorage.getItem("user")) {
    window.location.href = "/login";
    return null;
  }

  const API = "https://todo-backend-7f1d.onrender.com";

  const [tasks, setTasks] = useState<any[]>([]);
  const [text, setText] = useState("");

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

  const toggleDone = async (id: number) => {
    try {
      await fetch(`${API}/tasks/${id}/done`, {
        method: "PUT",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-6">
          Smart Todo 🚀
        </h1>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="bg-red-500 px-4 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>

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
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task.id)}
                />

                <p
                  className={`text-lg ${
                    task.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.text}
                </p>
              </div>

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