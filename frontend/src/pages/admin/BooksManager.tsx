import { useEffect, useState } from "react";
import { adminApi } from "@/api/adminApi";

export default function BooksManager() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  const fetchBooks = async () => {
    const data = await adminApi.books.list();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreate = async () => {
    await adminApi.books.create(newBook);
    setNewBook({ title: "", content: "" });
    fetchBooks();
  };

  const handleDelete = async (id: number) => {
    await adminApi.books.delete(id);
    fetchBooks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Books Admin</h1>
      <div>
        <input placeholder="Title" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} />
        <input placeholder="content" value={newBook.content} onChange={e => setNewBook({ ...newBook, content: e.target.value })} />
        <button onClick={handleCreate}>Add Book</button>
      </div>
      <table>
        <thead><tr><th>ID</th><th>Title</th><th>content</th><th>Delete</th><th>upvotes</th></tr></thead>
        <tbody>
          {books.map((b: any) => (
            <tr key={b.bookId}>
              <td>{b.bookId}</td>
              <td>{b.title}</td>
              <td>{b.content}</td>
              <td>{b.upvotes}</td>
              <td><button onClick={() => handleDelete(b.bookId)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
