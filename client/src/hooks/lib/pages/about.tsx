import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, Headphones, Award, Users, Zap, Heart } from "lucide-react";

export default function About() {
  useEffect(() => {
    // Animate elements on page load
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate');
      }, index * 100);
    });
  }, []);

  const teamMembers = [
    {
      name: "Alexandra Chen",
      role: "Lead Audio Engineer",
      bio: "10+ years crafting premium audio experiences for luxury brands worldwide.",
      icon: <Headphones className="w-6 h-6" />
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Director",
      bio: "Visionary artist blending traditional composition with cutting-edge technology.",
      icon: <Music className="w-6 h-6" />
    },
    {
      name: "Elena Kowalski",
      role: "Technical Innovation",
      bio: "Pioneer in audio visualization and interactive music technology.",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const achievements = [
    { number: "50+", label: "Premium Compositions" },
    { number: "15", label: "Industry Awards" },
    { number: "1M+", label: "Global Listeners" },
    { number: "99%", label: "Client Satisfaction" }
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "We pursue perfection in every note, every mix, and every master. Our commitment to quality is unwavering."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion",
      description: "Music is our language, audio is our art. We pour our hearts into every project we undertake."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "Great music comes from great partnerships. We work closely with artists to bring their vision to life."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-dark-surface to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary">
                About Rikivault Collective
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-gradient mb-6">
                Crafting Audio Excellence
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We are pioneers in luxury audio production, combining state-of-the-art technology with artistic mastery to create experiences that transcend ordinary listening.
              </p>
              <Button className="luxury-button text-lg px-8 py-4">
                Start Your Project
              </Button>
            </div>
            
            <div className="fade-in-up">
              <div 
                className="w-full h-96 rounded-xl relative overflow-hidden luxury-card"
                style={{
                  background: "linear-gradient(45deg, rgba(212, 175, 55, 0.3), rgba(26, 26, 26, 0.9))"
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Music className="w-24 h-24 text-primary mx-auto mb-4" />
                    <div className="text-primary text-2xl font-bold">Studio Excellence</div>
                  </div>
                </div>
                <div className="absolute inset-0 particles-bg opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.label}
                className="text-center fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-black text-gradient mb-2">
                  {achievement.number}
                </div>
                <div className="text-muted-foreground">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-dark-surface">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded in 2018, Rikivault Collective emerged from a simple belief: that audio should be an experience, 
                not just a product. Our journey began in a small studio in Los Angeles, where our founders 
                combined their passion for music with cutting-edge technology.
              </p>
              <p>
                Today, we're recognized as industry leaders in luxury audio production, serving clients who 
                demand nothing but the finest in sound quality and artistic vision. Our state-of-the-art 
                facility houses the most advanced audio equipment available, operated by a team of world-class 
                engineers and artists.
              </p>
              <p>
                Every project we undertake is a testament to our commitment to excellence. From intimate 
                acoustic recordings to complex electronic compositions, we bring the same level of precision 
                and artistry that has made us the preferred choice for discerning artists worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card 
                key={value.title}
                className="luxury-card p-8 text-center fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="pt-6">
                  <div className="text-primary mb-6 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-dark-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground">
              The artists and engineers behind the magic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={member.name}
                className="luxury-card p-6 text-center fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="pt-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    {member.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {member.name}
                  </h3>
                  <Badge className="mb-4 bg-primary/20 text-primary border-primary">
                    {member.role}
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="luxury-card p-12 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              Ready to Create Something Extraordinary?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's bring your musical vision to life with the quality and artistry that defines Luxe Music.
            </p>
            <Button className="luxury-button text-lg px-8 py-4">
              Start Your Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

