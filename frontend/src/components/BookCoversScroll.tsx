import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

export default function BookCoversScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // State to pause carousel on user interaction
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll/carousel effect with smoother animation
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = el.querySelector(".cover-reveal")?.clientWidth || 200;
    const gap = parseInt(getComputedStyle(el).gap || "32") || 32;

    function scrollOnce() {
      if (!el) return;
      // If we're at the right edge (with padding), scroll back to start
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        // Smooth scroll back to start
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Smoother scroll step
        el.scrollBy({ left: scrollAmount + gap, behavior: "smooth" });
      }
    }

    if (!isPaused) {
      intervalRef.current = setInterval(scrollOnce, 1500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  // Pause on mouse/touch
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);
    const handleTouchStart = () => setIsPaused(true);
    const handleTouchEnd = () => setIsPaused(false);

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // For a subtle parallax scroll on wheel horizontally
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Reveal animation on scroll in viewport
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const covers = Array.from(el.querySelectorAll(".cover-reveal"));
    const handler = () => {
      const windowBottom = window.scrollY + window.innerHeight;
      covers.forEach((cover: any, idx) => {
        const rect = cover.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          cover.classList.add("opacity-100","translate-y-0");
        }
      });
    };
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="w-full mt-10">
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-8 md:gap-12 px-2 md:px-6 pb-4 overflow-x-auto no-scrollbar snap-x snap-mandatory relative",
          "book-covers-scroll"
        )}
        tabIndex={0}
        aria-label="Book covers (scrollable)"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth", // ensures all scrolls are smooth, not just JS-driven
        }}
      >
        {covers.map((cover, i) => (
          <div
            key={cover.src}
            className={cn(
              "flex-shrink-0 snap-center relative transition-transform duration-300 hover:-translate-y-2",
              "cover-reveal opacity-0 translate-y-8",
              "rounded-xl overflow-hidden shadow-xl bg-white/10",
              "w-44 md:w-56 h-64 md:h-80"
            )}
            style={{
              animation: `fade-in 0.7s ${0.3 + i * 0.08}s both`,
            }}
            tabIndex={-1}
          >
            <img
              src={cover.src}
              alt={cover.alt}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              draggable={false}
              style={{
                userSelect: "none"
              }}
            />
          </div>
        ))}
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
        @media (max-width: 600px) {
          .book-covers-scroll { gap: 16px; }
        }
      `}</style>
    </div>
  );
}
