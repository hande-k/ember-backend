import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BookingForm from "@/components/BookingForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import ApartmentCard, { ApartmentProps } from "@/components/ApartmentCard";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Wifi, Utensils, Waves, LifeBuoy, MapPin, Coffee, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import GenreSection from "@/components/GenreSection";
import LoginModal from "@/components/LoginModal";
import { adminApi } from "@/api/adminApi";


export default function Index() {


  const [books, setBooks] = useState<any[]>([]);
  const bookCovers = [
    "073de082-9588-4dd1-b4a2-b3f8f03ef4df.png",
    "11e81619-5031-406d-8bca-1b45deb40796.png",
    "1e84d0de-cb13-4070-abff-8977f919ca93.png",
    "220badaf-f278-424f-bb3b-050dc0b39521.png",
    "2c2d0ac5-5e41-44fc-9abe-911cb697cc53.png",
    "43e2b62f-649b-4eb3-9614-e9d10a7ed2c7.png",
    "6261c834-b1d6-4cc9-bdec-8b904fefef07.png",
    "452639-97a45369-280a-4110-bed7-f630d5f77619.png",
    "af1be7ca-d726-43f9-9d0d-894fe221f59b.png",
    "bde5f250-f52f-4bf4-9d62-c0163012bf10.png",
    "ec8eb46b-9408-4599-959e-34328c1e30e5.png",
  ];

  const getRandomCover = () => {
    const randomIndex = Math.floor(Math.random() * bookCovers.length);
    return `/lovable-uploads/${bookCovers[randomIndex]}`;
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await adminApi.books.list();
      setBooks(fetchedBooks);
    };
    fetchBooks();
  }, []);
  const { t } = useLanguage();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Feature items
  const features = [
    {
      icon: <Waves className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.beachfront.title,
      description: t.home.amenities.features.beachfront.description
    },
    {
      icon: <LifeBuoy className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.pools.title,
      description: t.home.amenities.features.pools.description
    },
    {
      icon: <Utensils className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.restaurant.title,
      description: t.home.amenities.features.restaurant.description
    },
    {
      icon: <Wifi className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.wifi.title,
      description: t.home.amenities.features.wifi.description
    },
    {
      icon: <Coffee className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.bar.title,
      description: t.home.amenities.features.bar.description
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: t.home.amenities.features.location.title,
      description: t.home.amenities.features.location.description
    }
  ];

  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/write");
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Book genres section after hero carousel */}
        {/* Increase margin-top so it sits further down from the hero */}
        <div className="mt-20 mb-8">
          <GenreSection />
        </div>

        {/* Booking Form Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        {/* Published Books Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Discover New Stories
              </h2>
              <p className="text-muted-foreground">
                Explore the latest books published by our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book: any, index: number) => (
                <div key={book.bookId} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                  <Link to={`/books/${book.bookId}`}>
                    <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-card cursor-pointer hover:scale-105 transition-transform">
                      <img
                        src={book.coverUrl ? book.coverUrl : getRandomCover()}
                        alt={book.title}
                        className="w-full h-60 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold">{book.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                          {book.content?.substring(0, 150) ?? ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>



        <button
          className="fixed bottom-8 right-8 p-4 rounded-full bg-blue-600 text-white shadow-lg"
          onClick={handleClick}
        >
          <Plus size={32} />
        </button>

      </main>

      <Footer />
    </div>
  );
}
