import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '200px', background: '#eee', padding: '20px' }}>
        <h2>Admin Menu</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/admin/books">Books</Link></li>
          <li><Link to="/admin/genres">Genres</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
          <li><Link to="/admin/interactions">Interactions</Link></li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}
