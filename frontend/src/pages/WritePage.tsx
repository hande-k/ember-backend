import { useState, useEffect } from "react";
import { adminApi } from "@/api/adminApi";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allGenres, setAllGenres] = useState<any[]>([]);
  const [primaryGenreInput, setPrimaryGenreInput] = useState("");
  const [primaryGenreId, setPrimaryGenreId] = useState<number | null>(null);
  const [selectedSubGenres, setSelectedSubGenres] = useState<number[]>([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);
  const [contentAi, setContentAi] = useState("");

  const mistralApiKey = "WPu0KpNOAUFviCzNgnbWQuRbz7Zpwyde"; // <-- hier kommt dein echter Key hin

  useEffect(() => {
    const fetchGenres = async () => {
      const data = await adminApi.genres.list();
      setAllGenres(data);
    };
    fetchGenres();
  }, []);

  const handlePrimaryGenreBlur = async () => {
    const input = primaryGenreInput.trim();
    if (!input) return;

    let existing = allGenres.find(g => g.genreName.toLowerCase() === input.toLowerCase());
    if (!existing) {
      const newGenre = await adminApi.genres.create({ genreName: input });
      setAllGenres(prev => [...prev, newGenre]);
      existing = newGenre;
    }
    setPrimaryGenreId(existing.genreId);
  };

  const handleSave = async () => {
    if (!primaryGenreId) {
      alert("Please enter a primary genre.");
      return;
    }

    const book = await adminApi.books.create({ title, content });

    await adminApi.bookGenres.link({
      bookId: book.bookId,
      genreId: primaryGenreId,
      type: "primary",
    });

    for (const subId of selectedSubGenres) {
      await adminApi.bookGenres.link({
        bookId: book.bookId,
        genreId: subId,
        type: "sub",
      });
    }

    alert("Book saved!");
  };

  const callMistral = async () => {
    setLoadingAi(true);
    setAiSuggestion("");

    const recentContext = getLastContext(content);

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${mistralApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral-medium",
        messages: [
          {
            role: "system",
            content: "You are a professional story writer. Continue the story naturally based on the provided previous content. Do not explain, greet or add any meta-comments. Only continue the narrative directly."
          },
          {
            role: "user",
            content: `Here is the story so far:\n${recentContext}\n\nNow continue: ${aiPrompt}`
          }
        ],
        max_tokens: 400
      }),
    });

    const data = await response.json();
    const generated = data.choices[0].message.content;
    setAiSuggestion(generated);
    setLoadingAi(false);
  };

  const acceptSuggestion = () => {
    setContent(content + "\n\n" + aiSuggestion);
    setAiSuggestion("");
    setAiPrompt("");
  };

  const rejectSuggestion = () => {
    setAiSuggestion("");
  };

  const getLastContext = (text: string, limit: number = 4000) => {
    return text.slice(-limit);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT SIDE: Writing Form */}
      <div>
        <h1 className="text-2xl mb-4">Write Your Book</h1>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-3 border rounded mb-4 bg-white text-black"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full p-3 border rounded mb-4 bg-white text-black h-60"
        />

        <div className="mb-6">
          <label className="font-bold">Primary Genre:</label>
          <input
            value={primaryGenreInput}
            onChange={(e) => setPrimaryGenreInput(e.target.value)}
            onBlur={handlePrimaryGenreBlur}
            placeholder="Type or search genre..."
            className="w-full p-3 border rounded bg-white text-black"
            list="genres-datalist"
          />
          <datalist id="genres-datalist">
            {allGenres.map(g => (
              <option key={g.genreId} value={g.genreName} />
            ))}
          </datalist>
        </div>

        <div className="mb-6">
          <label className="font-bold">Sub Genres:</label>
          <div className="grid grid-cols-2 gap-2">
            {allGenres.map(g => (
              <label key={g.genreId} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedSubGenres.includes(g.genreId)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSubGenres([...selectedSubGenres, g.genreId]);
                    } else {
                      setSelectedSubGenres(selectedSubGenres.filter(id => id !== g.genreId));
                    }
                  }}
                />
                <span>{g.genreName}</span>
              </label>
            ))}
          </div>
        </div>

        <button onClick={handleSave} className="p-3 bg-blue-600 text-white rounded">
          Save Book
        </button>
      </div>

      {/* RIGHT SIDE: AI Assistant */}
      <div>
        <h2 className="text-xl mb-4">AI Assistant</h2>

        <textarea
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="Describe what you want..."
          className="w-full p-3 border rounded mb-4 bg-white text-black h-32"
        />

        <button
          onClick={callMistral}
          className="p-3 bg-green-600 text-white rounded mb-4"
          disabled={loadingAi || !aiPrompt}
        >
          {loadingAi ? "Generating..." : "Generate with AI"}
        </button>

        {aiSuggestion && (
          <div className="p-4 border rounded bg-gray-100 text-black mb-4">
            <p>{aiSuggestion}</p>
            <div className="flex space-x-4 mt-4">
              <button onClick={acceptSuggestion} className="p-2 bg-blue-500 text-white rounded">✅ Use</button>
              <button onClick={rejectSuggestion} className="p-2 bg-red-500 text-white rounded">❌ Discard</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

