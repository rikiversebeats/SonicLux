import { useEffect } from "react";
import ContactForm from "@/components/contact-form";

export default function Contact() {
  useEffect(() => {
    // Animate elements on page load
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate');
      }, index * 100);
    });
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-dark-surface to-background">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-black text-gradient mb-6 fade-in-up">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 fade-in-up">
            Ready to bring your musical vision to life? Let's start a conversation about your next project.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="fade-in-up">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
