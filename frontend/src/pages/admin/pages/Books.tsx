import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../api/adminApi';
import BookForm from '../components/BookForm';
import BooksManager from '../BooksManager';

export default function Books() {
  const [books, setBooks] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);

  const loadBooks = async () => {
    const res = await adminApi.books.list();
    setBooks(res.data);
  };

  useEffect(() => { loadBooks(); }, []);

  const handleSave = async (data: any) => {
    if (editing) {
      await adminApi.books.update(editing.bookId, { ...editing, ...data });
    } else {
      await adminApi.books.create(data);
    }
    setEditing(null);
    await loadBooks();
  };

  const handleDelete = async (id: number) => {
    await adminApi.books.delete(id);
    await loadBooks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Books</h2>
      <BooksManager />
      <button onClick={() => setEditing({})}>Add Book</button>
      {editing && (
        <BookForm
          initialData={editing}
          onSubmit={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}
      <table border={1} cellPadding={5}>
        <thead><tr><th>ID</th><th>Title</th><th>Author</th><th>Actions</th></tr></thead>
        <tbody>
          {books.map(b => (
            <tr key={b.bookId}>
              <td>{b.bookId}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>
                <button onClick={() => setEditing(b)}>Edit</button>
                <button onClick={() => handleDelete(b.bookId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
