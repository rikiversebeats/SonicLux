import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gsap?: any;
  }
}

export function useGSAP(callback: () => void, dependencies: any[] = []) {
  const callbackRef = useRef(callback);
  
  // Update the callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Load GSAP from CDN if not already loaded
    if (!window.gsap) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.onload = () => {
        // GSAP loaded, execute callback
        callbackRef.current();
      };
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    } else {
      // GSAP already loaded, execute callback immediately
      callbackRef.current();
    }
  }, dependencies);
}

export function useGSAPTimeline() {
  const timelineRef = useRef<any>(null);

  useEffect(() => {
    if (window.gsap) {
      timelineRef.current = window.gsap.timeline();
    }
  }, []);

  return timelineRef.current;
}
