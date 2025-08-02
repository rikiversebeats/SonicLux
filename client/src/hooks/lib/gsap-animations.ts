declare global {
  interface Window {
    gsap?: any;
  }
}

export class GSAPAnimations {
  static isLoaded(): boolean {
    return typeof window !== 'undefined' && !!window.gsap;
  }

  static async loadGSAP(): Promise<void> {
    if (this.isLoaded()) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load GSAP'));
      document.head.appendChild(script);
    });
  }

  static fadeInUp(elements: string | HTMLElement | HTMLElement[], options: any = {}) {
    if (!this.isLoaded()) return;

    const defaultOptions = {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1
    };

    return window.gsap.fromTo(elements, 
      { y: defaultOptions.y, opacity: defaultOptions.opacity },
      { ...defaultOptions, ...options, y: 0, opacity: 1 }
    );
  }

  static fadeIn(elements: string | HTMLElement | HTMLElement[], options: any = {}) {
    if (!this.isLoaded()) return;

    const defaultOptions = {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    };

    return window.gsap.fromTo(elements,
      { opacity: defaultOptions.opacity },
      { ...defaultOptions, ...options, opacity: 1 }
    );
  }

  static slideInLeft(elements: string | HTMLElement | HTMLElement[], options: any = {}) {
    if (!this.isLoaded()) return;

    const defaultOptions = {
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    };

    return window.gsap.fromTo(elements,
      { x: defaultOptions.x, opacity: defaultOptions.opacity },
      { ...defaultOptions, ...options, x: 0, opacity: 1 }
    );
  }

  static slideInRight(elements: string | HTMLElement | HTMLElement[], options: any = {}) {
    if (!this.isLoaded()) return;

    const defaultOptions = {
      x: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    };

    return window.gsap.fromTo(elements,
      { x: defaultOptions.x, opacity: defaultOptions.opacity },
      { ...defaultOptions, ...options, x: 0, opacity: 1 }
    );
  }

  static scaleIn(elements: string | HTMLElement | HTMLElement[], options: any = {}) {
    if (!this.isLoaded()) return;

    const defaultOptions = {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    };

    return window.gsap.fromTo(elements,
      { scale: defaultOptions.scale, opacity: defaultOptions.opacity },
      { ...defaultOptions, ...options, scale: 1, opacity: 1 }
    );
  }

  static createTimeline(options: any = {}) {
    if (!this.isLoaded()) return null;
    return window.gsap.timeline(options);
  }

  static scrollTrigger(element: string | HTMLElement, animation: any, options: any = {}) {
    if (!this.isLoaded()) return;

    // Note: This would require ScrollTrigger plugin
    // For now, we'll use Intersection Observer as fallback
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animation();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, ...options });

    const target = typeof element === 'string' ? document.querySelector(element) : element;
    if (target) {
      observer.observe(target);
    }
  }

  static textReveal(element: string | HTMLElement, options: any = {}) {
    if (!this.isLoaded()) return;

    const defaultOptions = {
      duration: 1.2,
      ease: "power3.out",
      delay: 0
    };

    const target = typeof element === 'string' ? document.querySelector(element) : element;
    if (!target) return;

    // Split text into spans for animation
    const text = target.textContent || '';
    const chars = text.split('').map(char => 
      char === ' ' ? '<span>&nbsp;</span>' : `<span>${char}</span>`
    ).join('');
    
    target.innerHTML = chars;
    const spans = target.querySelectorAll('span');

    return window.gsap.fromTo(spans, 
      { y: 100, opacity: 0 },
      { 
        ...defaultOptions, 
        ...options, 
        y: 0, 
        opacity: 1, 
        stagger: 0.02 
      }
    );
  }

  static particleFloat(elements: string | HTMLElement | HTMLElement[]) {
    if (!this.isLoaded()) return;

    return window.gsap.to(elements, {
      y: "random(-20, 20)",
      x: "random(-15, 15)",
      rotation: "random(-5, 5)",
      duration: "random(3, 6)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 2,
        from: "random"
      }
    });
  }
}

export default GSAPAnimations;

