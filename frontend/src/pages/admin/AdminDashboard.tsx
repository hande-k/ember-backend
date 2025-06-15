import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div style={{ padding: 30 }}>
      <h1>Admin Panel</h1>
      <ul>
        <li><Link to="/admin/books">Books</Link></li>
        <li><Link to="/admin/genres">Genres</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/interactions">User Interactions</Link></li>
      </ul>
    </div>
  );
}
