import React, { useState } from 'react';

export default function BookForm({ initialData = {}, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    author: initialData.author || '',
    description: initialData.description || '',
    coverUrl: initialData.coverUrl || '',
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
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" /><br />
      <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" /><br />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" /><br />
      <input name="coverUrl" value={formData.coverUrl} onChange={handleChange} placeholder="Cover URL" /><br />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>Cancel</button>
    </form>
  );
}
