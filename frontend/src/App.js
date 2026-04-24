import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = process.env.REACT_APP_API_URL;
function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };

  const addUser = async () => {
    if (!form.name || !form.email) return;

    await axios.post(`${API}/users`, form);
    setForm({ name: "", email: "" });
    fetchUsers();
  };
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <div className="container">

        <header className="header">
          <h1>User Dashboard</h1>
          <p>Manage users Just in One Click</p>
        </header>

        <div className="card form-card">
          <h2>Add User</h2>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              addUser();
            }}
          >
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <button type="submit">+ Add User</button>
          </form>
        </div>

        <div className="grid">
          {users.map((u) => (
            <div className="user-card" key={u.id}>
              <div className="avatar">
                {u.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3>{u.name}</h3>
                <p>{u.email}</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteUser(u.id)}
              >
                ✕
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;