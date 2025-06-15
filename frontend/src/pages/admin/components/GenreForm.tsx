import React, { useState } from 'react';

export default function GenreForm({ initialData = {}, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: initialData.name || ''
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
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Genre Name" /><br />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>Cancel</button>
    </form>
  );
}
