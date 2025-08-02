import { useState, useEffect } from "react";
import AdvancedAudioVisualizer from "@/components/advanced-audio-visualizer";
import MusicGallery from "@/components/music-gallery";
import MusicPlayer from "@/components/music-player";

export default function Music() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);

  useEffect(() => {
    // Animate elements on page load
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate');
      }, index * 100);
    });
  }, []);

  const musicTracks = [
    {
      id: "1",
      title: "Golden Symphony",
      artist: "Rikivault Collective",
      description: "A masterpiece of orchestral arrangement featuring premium acoustic elements and luxurious soundscapes.",
      imageGradient: "linear-gradient(45deg, #D4AF37, #F4D03F)",
      duration: "4:23",
      genre: "orchestral",
      releaseDate: "2024-01-15",
      plays: 2450000,
      rating: 4.9,
      isNew: true,
      isTrending: true
    },
    {
      id: "2",
      title: "Digital Dreams",
      artist: "Quantum Beats",
      description: "Electronic composition blending traditional instruments with cutting-edge digital audio processing.",
      imageGradient: "radial-gradient(circle, rgba(212, 175, 55, 0.4), rgba(26, 26, 26, 0.8))",
      duration: "3:45",
      genre: "electronic",
      releaseDate: "2024-02-08",
      plays: 1890000,
      rating: 4.7,
      isTrending: true
    },
    {
      id: "3",
      title: "Platinum Rhythms",
      artist: "Elite Audio",
      description: "High-fidelity recording showcasing the finest in audio engineering and musical composition.",
      imageGradient: "linear-gradient(135deg, #1A1A1A, #D4AF37)",
      duration: "5:12",
      genre: "ambient",
      releaseDate: "2023-11-22",
      plays: 3120000,
      rating: 4.8,
      isExclusive: true
    },
    {
      id: "4",
      title: "Crystal Harmonics",
      artist: "Rikivault Collective",
      description: "Ethereal melodies combined with pristine production quality for an immersive listening experience.",
      imageGradient: "linear-gradient(90deg, #D4AF37, #FFFFFF)",
      duration: "3:28",
      genre: "ambient",
      releaseDate: "2024-01-03",
      plays: 1560000,
      rating: 4.6,
      isNew: true
    },
    {
      id: "5",
      title: "Neon Nights",
      artist: "Cyber Symphony",
      description: "Futuristic soundscapes with deep bass and shimmering highs that define modern luxury audio.",
      imageGradient: "linear-gradient(45deg, #FF6B6B, #D4AF37)",
      duration: "4:56",
      genre: "electronic",
      releaseDate: "2023-12-15",
      plays: 2780000,
      rating: 4.9,
      isTrending: true,
      isExclusive: true
    },
    {
      id: "6",
      title: "Royal Concerto",
      artist: "Chamber Elite",
      description: "Classical composition reimagined with contemporary production techniques and royal elegance.",
      imageGradient: "linear-gradient(135deg, #8B4513, #D4AF37)",
      duration: "6:34",
      genre: "orchestral",
      releaseDate: "2023-10-30",
      plays: 4200000,
      rating: 5.0,
      isExclusive: true
    },
    {
      id: "7",
      title: "Midnight Jazz",
      artist: "Smooth Collective",
      description: "Sophisticated jazz composition with modern production and classic instrumental arrangements.",
      imageGradient: "linear-gradient(135deg, #2C1810, #D4AF37)",
      duration: "4:15",
      genre: "jazz",
      releaseDate: "2024-02-14",
      plays: 980000,
      rating: 4.5,
      isNew: true
    },
    {
      id: "8",
      title: "Cosmic Voyage",
      artist: "Stellar Sounds",
      description: "An epic journey through space with orchestral grandeur and electronic innovation.",
      imageGradient: "linear-gradient(45deg, #0F0F23, #D4AF37)",
      duration: "7:42",
      genre: "cinematic",
      releaseDate: "2023-09-18",
      plays: 1750000,
      rating: 4.7
    }
  ];

  const handleTrackSelect = (track: any) => {
    setSelectedTrack(track);
    const trackIndex = musicTracks.findIndex(t => t.id === track.id);
    setCurrentTrackIndex(trackIndex);
  };

  const handlePlayTrack = (track: any) => {
    handleTrackSelect(track);
    // Additional play logic would go here
  };

  const handleTrackChange = (index: number) => {
    setCurrentTrackIndex(index);
    setSelectedTrack(musicTracks[index]);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-dark-surface to-background">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-black text-gradient mb-6 fade-in-up">
            Music Library
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 fade-in-up">
            Explore our extensive collection of premium audio compositions crafted for the most discerning listeners
          </p>
        </div>
      </section>

      {/* Advanced Audio Visualizer */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <AdvancedAudioVisualizer className="fade-in-up" />
        </div>
      </section>

      {/* Music Player */}
      {selectedTrack && (
        <section className="py-4 px-4">
          <div className="container mx-auto max-w-6xl">
            <MusicPlayer
              playlist={musicTracks}
              currentTrackIndex={currentTrackIndex}
              onTrackChange={handleTrackChange}
              className="fade-in-up"
            />
          </div>
        </section>
      )}

      {/* Interactive Music Gallery */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <MusicGallery
            tracks={musicTracks}
            onTrackSelect={handleTrackSelect}
            onPlayTrack={handlePlayTrack}
            className="fade-in-up"
          />
        </div>
      </section>
    </div>
  );
}
