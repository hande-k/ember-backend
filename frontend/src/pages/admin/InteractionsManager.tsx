import { useEffect, useState } from "react";
import axios from "axios";

export default function InteractionsManager() {
  const [interactions, setInteractions] = useState([]);

  const fetchInteractions = async () => {
    const res = await axios.get("http://localhost:8080/api/interaction/all");
    setInteractions(res.data);
  };

  useEffect(() => {
    fetchInteractions();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/interaction/delete/${id}`);
    fetchInteractions();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>User Interactions Admin</h1>

      <table>
        <thead><tr><th>ID</th><th>User ID</th><th>Book ID</th><th>Type</th><th>Delete</th></tr></thead>
        <tbody>
          {interactions.map((i: any) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.userId}</td>
              <td>{i.bookId}</td>
              <td>{i.interactionType}</td>
              <td><button onClick={() => handleDelete(i.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
