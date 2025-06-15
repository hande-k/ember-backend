import { useEffect, useState } from "react";
import axios from "axios";

export default function GenresManager() {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState({ name: "" });

  const fetchGenres = async () => {
    const res = await axios.get("http://localhost:8080/api/genre/all");
    setGenres(res.data);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleCreate = async () => {
    await axios.post("http://localhost:8080/api/genre/create", newGenre);
    setNewGenre({ name: "" });
    fetchGenres();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/genre/delete/${id}`);
    fetchGenres();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Genres Admin</h1>

      <div>
        <input
          placeholder="Name"
          value={newGenre.name}
          onChange={e => setNewGenre({ ...newGenre, name: e.target.value })}
        />
        <button onClick={handleCreate}>Add Genre</button>
      </div>

      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Delete</th></tr></thead>
        <tbody>
          {genres.map((g: any) => (
            <tr key={g.genreId}>
              <td>{g.genreId}</td>
              <td>{g.name}</td>
              <td><button onClick={() => handleDelete(g.genreId)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
