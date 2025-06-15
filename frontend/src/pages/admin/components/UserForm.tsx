import React, { useState } from 'react';

export default function UserForm({ initialData = {}, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    username: initialData.username || '',
    email: initialData.email || ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" /><br />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" /><br />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>Cancel</button>
    </form>
  );
}
