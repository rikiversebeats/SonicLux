import { useEffect, useRef } from "react";
import HeroSection from "@/components/hero-section";
import AdvancedAudioVisualizer from "@/components/advanced-audio-visualizer";
import MusicCard from "@/components/music-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Star, Zap, Award } from "lucide-react";

export default function Home() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const featuredTracks = [
    {
      title: "Golden Symphony",
      artist: "Rikivault Collective",
      description: "A masterpiece of orchestral arrangement featuring premium acoustic elements and luxurious soundscapes.",
      imageGradient: "linear-gradient(45deg, #D4AF37, #F4D03F)",
      duration: "4:23"
    },
    {
      title: "Digital Dreams",
      artist: "Quantum Beats",
      description: "Electronic composition blending traditional instruments with cutting-edge digital audio processing.",
      imageGradient: "radial-gradient(circle, rgba(212, 175, 55, 0.4), rgba(26, 26, 26, 0.8))",
      duration: "3:45"
    },
    {
      title: "Platinum Rhythms",
      artist: "Elite Audio",
      description: "High-fidelity recording showcasing the finest in audio engineering and musical composition.",
      imageGradient: "linear-gradient(135deg, #1A1A1A, #D4AF37)",
      duration: "5:12"
    }
  ];

  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Uncompromising audio fidelity with industry-leading production standards"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Advanced Technology",
      description: "Cutting-edge audio processing and visualization capabilities"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Award Winning",
      description: "Recognized excellence in luxury audio production and design"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Advanced Audio Visualizer Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <AdvancedAudioVisualizer className="fade-in-up" />
        </div>
      </section>

      {/* Featured Music Section */}
      <section ref={featuredRef} className="py-16 px-4 bg-dark-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Featured Compositions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated selection of premium audio experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredTracks.map((track, index) => (
              <div key={track.title} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <MusicCard {...track} />
              </div>
            ))}
          </div>

          <div className="text-center fade-in-up">
            <Link href="/music">
              <Button className="luxury-button text-lg px-8 py-4">
                View All Music
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Rikivault Collective
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the pinnacle of audio excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="luxury-card p-8 text-center fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section ref={aboutRef} className="py-16 px-4 bg-dark-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
                Luxury Audio Production
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Luxe Music, we specialize in creating premium audio experiences that transcend traditional boundaries. Our state-of-the-art studio combines cutting-edge technology with artistic vision.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                From orchestral recordings to electronic compositions, every project receives the meticulous attention to detail that defines luxury audio production.
              </p>
              <Link href="/about">
                <Button className="luxury-button">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="fade-in-up">
              <div 
                className="w-full h-96 rounded-xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(45deg, rgba(212, 175, 55, 0.2), rgba(26, 26, 26, 0.9))"
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-primary text-6xl font-bold mb-4">LUXE</div>
                    <div className="text-muted-foreground text-xl">STUDIO</div>
                  </div>
                </div>
                <div className="absolute inset-0 particles-bg opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
