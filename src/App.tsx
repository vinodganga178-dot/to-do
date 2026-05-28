import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [text, setText] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/tasks")
      .then((res) => res.json())
      .then((data) => {
        const taskTexts = data.map((task: any) => task.text);
        setTasks(taskTexts);
      });
  }, []);

  // Add task
  const addTask = async () => {
    if (text.trim() === "") return;

    await fetch(`https://todo-backend-7f1d.onrender.com/`, {
      method: "POST",
    });

    setTasks([...tasks, text]);
    setText("");
  };

  // Delete task
  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  // Mark as done
  const doneTask = (index: number) => {
    const updated = [...tasks];

    if (!updated[index].startsWith("✅")) {
      updated[index] = "✅ " + updated[index];
    }

    setTasks(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-10">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-10">
          Smart Todo 🚀
        </h1>

        {/* Input */}
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

          {tasks.map((task, index) => (

            <div
              key={index}
              className="bg-gray-800 p-5 rounded-2xl flex justify-between items-center"
            >

              <p className="text-lg">{task}</p>

              <div className="flex gap-2">

                <button
                  onClick={() => doneTask(index)}
                  className="bg-green-500 px-4 py-2 rounded-xl hover:scale-105 transition"
                >
                  Done
                </button>

                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-500 px-4 py-2 rounded-xl hover:scale-105 transition"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default App;