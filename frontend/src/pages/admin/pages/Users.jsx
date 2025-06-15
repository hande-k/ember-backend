import React, { useEffect, useState } from 'react';
import { adminApi } from '@/api/adminApi';
import UsersManager from '../UsersManager';

export default function Users() {
  const [users, setUsers] = useState < any[] > ([]);
  const [editing, setEditing] = useState < any > (null);

  const loadUsers = async () => {
    const data = await adminApi.users.list();
    setUsers(data);
  };

  useEffect(() => { loadUsers(); }, []);

  const handleSave = async (data: any) => {
    if (editing) {
      await adminApi.users.update(editing.id, { ...editing, ...data });
    } else {
      await adminApi.users.create(data);
    }
    setEditing(null);
    await loadUsers();
  };

  const handleDelete = async (id: number) => {
    await adminApi.users.delete(id);
    await loadUsers();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Users</h2>
      <UsersManager />
      <button onClick={() => setEditing({})}>Add User</button>
      {/* Hier könntest du noch ein UserForm machen */}
      <table border={1} cellPadding={5}>
        <thead><tr><th>ID</th><th>Username</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>
                <button onClick={() => setEditing(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
