import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useGSAP } from "@/hooks/use-gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return;

    // GSAP timeline for hero animations
    const tl = window.gsap?.timeline({ delay: 0.5 });
    
    tl?.fromTo(titleRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
      "-=0.3"
    )
    .fromTo(ctaRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 
      "-=0.2"
    );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          {/* Placeholder for luxury music studio video */}
          <source src="data:video/mp4;base64," type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-gradient opacity-80" />
      </div>

      {/* Particle Background */}
      <div className="absolute inset-0 particles-bg opacity-60 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 hero-title opacity-0"
        >
          RIKIVAULT COLLECTIVE
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto opacity-0"
        >
          Immerse yourself in the world of premium music production with cutting-edge audio technology
        </p>

        <div ref={ctaRef} className="opacity-0">
          <Link href="/music">
            <Button className="luxury-button text-lg px-8 py-4">
              Explore Music
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

