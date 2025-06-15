
import React from "react";
import { Link } from "react-router-dom";

const covers = [
  {
    src: "/lovable-uploads/43e2b62f-649b-4eb3-9614-e9d10a7ed2c7.png",
    alt: "Glass House - A Read Ember Story"
  },
  {
    src: "/lovable-uploads/220badaf-f278-424f-bb3b-050dc0b39521.png",
    alt: "Velvet Chains - A Read Ember Story"
  },
  {
    src: "/lovable-uploads/af1be7ca-d726-43f9-9d0d-894fe221f59b.png",
    alt: "Assets of Attraction - A Read Ember Story"
  },
  {
    src: "/lovable-uploads/ec8eb46b-9408-4599-959e-34328c1e30e5.png",
    alt: "Dark Elite - A Read Ember Story"
  },
  {
    src: "/lovable-uploads/6261c834-b1d6-4cc9-bdec-8b904fefef07.png",
    alt: "Forbidden Attraction - A Read Ember Story"
  },
  {
    src: "/lovable-uploads/073de082-9588-4dd1-b4a2-b3f8f03ef4df.png",
    alt: "French Kiss Unlocked - A Read Ember Story"
  },
  {
    src: "/lovable-uploads/bde5f250-f52f-4bf4-9d62-c0163012bf10.png",
    alt: "Wildflower Love - A Read Ember Story"
  },
  {
    src: "/lovable-uploads/1e84d0de-cb13-4070-abff-8977f919ca93.png",
    alt: "Velvet and Vows - A Read Ember Story"
  },
  {
    src: "/lovable-uploads/2c2d0ac5-5e41-44fc-9abe-911cb697cc53.png",
    alt: "Beyond The Sidelines - A Read Ember Story"
  },
  {
    src: "/lovable-uploads/11e81619-5031-406d-8bca-1b45deb40796.png",
    alt: "Swipe Right On Revolution - A Read Ember Story"
  },
];

// Create a simple function to generate a book "ID" for routes
const getBookId = (cover: { src: string; alt: string }, idx: number) => {
  // For example, use the index as the ID (could be replaced with a real ID)
  return idx.toString();
};

export default function Apartments() {
  return (
    <div className="min-h-screen bg-background pt-28 pb-16 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold font-playfair text-primary mb-12 tracking-wide">
        All Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 w-full max-w-6xl">
        {covers.map((cover, idx) => (
          <Link
            to={`/books/${getBookId(cover, idx)}`}
            key={cover.src}
            className="flex flex-col items-center rounded-xl overflow-hidden shadow-xl bg-white/10 w-full hover:ring-4 hover:ring-primary/30 transition"
            style={{ textDecoration: "none" }}
          >
            <img
              src={cover.src}
              alt={cover.alt}
              loading="lazy"
              className="w-full h-80 object-cover object-center"
              draggable={false}
              style={{ userSelect: "none" }}
            />
            <div className="py-3 px-2 text-center">
              <span className="font-playfair text-lg text-primary-foreground">{cover.alt}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
