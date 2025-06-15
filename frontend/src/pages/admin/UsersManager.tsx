import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersManager() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8080/api/user/all");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/user/delete/${id}`);
    fetchUsers();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Users Admin</h1>

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
