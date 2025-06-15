
import React from "react";

const genres = [
  { key: "enemies", label: "ENEMIES TO LOVERS" },
  { key: "triangle", label: "LOVE TRIANGLE" },
  { key: "fake", label: "FAKE DATING" },
  { key: "slow", label: "SLOW BURN" },
  { key: "second", label: "SECOND CHANCE" },
  { key: "morally", label: "MORALLY GREY" },
];

// Use Playfair Display as a close substitute for Henri Didot
export default function GenreSection() {
  // Click handler for demonstration
  const handleClick = (genre: string) => {
    // Placeholder: take real action (e.g. filtering) here
    // alert(`Clicked: ${genre}`);
  };

  return (
    <div className="w-full bg-black py-16 flex items-start border-t border-white/10 relative" style={{ minHeight: 280 }}>
      <div className="flex flex-col items-start w-full max-w-md ml-10">
        {genres.map((genre) => (
          <button
            key={genre.key}
            type="button"
            className="py-3 mb-3 last:mb-0 text-3xl md:text-4xl font-bold hover:scale-105 transition-transform duration-200 text-left"
            style={{
              color: "#e53935",
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "0.01em",
              background: "transparent",
            }}
            onClick={() => handleClick(genre.label)}
            tabIndex={0}
          >
            {genre.label}
          </button>
        ))}
      </div>
    </div>
  );
}
