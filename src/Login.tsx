import { useState } from "react";

function Login() {
  const [name, setName] = useState("");

  const login = () => {
    if (!name.trim()) {
      alert("Please enter a username");
      return;
    }

    localStorage.setItem("user", name);
    window.location.href = "/";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #0f172a)",
      }}
    >
      <div
        style={{
          background: "#1f2937",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          textAlign: "center",
          color: "white",
          boxShadow: "0 0 30px rgba(0,255,255,0.2)",
        }}
      >
        <h1
          style={{
            color: "#22d3ee",
            marginBottom: "20px",
          }}
        >
          Smart Todo 🚀
        </h1>

        <p style={{ color: "#9ca3af" }}>
          Login to access your tasks
        </p>

        <input
          type="text"
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            color: "black",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            background: "#22d3ee",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;