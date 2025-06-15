import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { adminApi } from "@/api/adminApi";

const ELEVENLABS_API_KEY = "sk_0fc4401bf0c71ec872aa58b13454fb7a7c59ba82f285d50a";
const VOICES = [
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel" },
  { id: "AZnzlk1XvdvUeBnXmlld", name: "Domi" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella" },
  { id: "ShB6BQqbEXZxWO5511Qq", name: "Blondie" },
  { id: "tQ4MEZFJOzsahSEEZtHK", name: "Ivanna" }

];

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voice, setVoice] = useState(VOICES[0].id);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await adminApi.books.get(Number(id));
        setBook(data);

        const authorsData = await adminApi.interactions.getAuthors(Number(id));
        setAuthors(authorsData);
      } catch (err: any) {
        setError("Book not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handlePlay = async () => {
    if (!book?.content) return;
    setPlaying(true);
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            text: book.content.substring(0, 2500),
            model_id: "eleven_monolingual_v1"
          })
        }
      );

      if (!response.ok) {
        throw new Error(`TTS failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    } catch (err) {
      console.error("Error generating audio", err);
    } finally {
      setPlaying(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error || !book) return <div>{error || "Book not found"}</div>;

  return (
    <div className="min-h-screen bg-background py-16 px-4 md:px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-10">
        <div className="flex items-center space-x-4">
          <select
            className="p-2 border rounded"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            {VOICES.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
          <button
            onClick={handlePlay}
            disabled={playing}
            className="p-2 bg-blue-600 text-white rounded"
          >
            {playing ? "Generating..." : "Play"}
          </button>
          <audio ref={audioRef} controls className="mt-4 w-full" />
        </div>

        <section className="bg-black/90 text-white rounded-xl shadow-lg p-6 md:p-10 space-y-4">
          <h1 className="text-3xl font-serif font-bold mb-4">{book.title}</h1>
          <h3 className="text-lg font-sans mb-4">
            by {authors.length > 0 ? authors.map(a => a.username).join(", ") : "Unknown Author"}
          </h3>
          <img src={book.coverUrl} alt={book.title} className="rounded-lg mb-6" />
          <div className="whitespace-pre-line text-base md:text-lg font-sans">
            {book.content}
          </div>
        </section>
      </div>
    </div>
  );
}
