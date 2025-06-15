import { useEffect, useState } from "react";
import { adminApi } from "@/api/adminApi";

export default function UsersManager() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "" });

  const fetchUsers = async () => {
    const data = await adminApi.users.list();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    await adminApi.users.create(newUser);
    setNewUser({ username: "", password: "" });
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    await adminApi.users.delete(id);
    fetchUsers();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Users Admin</h1>
      <div>
        <input
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={handleCreate}>Add User</button>
      </div>

      <table>
        <thead><tr><th>ID</th><th>Username</th><th>Delete</th></tr></thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td><button onClick={() => handleDelete(u.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
