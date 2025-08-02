import { useCallback, useRef, useState } from "react";

interface UseAudioVisualizerReturn {
  init: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  isInitialized: boolean;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
}

export function useAudioVisualizer(canvasRef: React.RefObject<HTMLCanvasElement>): UseAudioVisualizerReturn {
  const [isInitialized, setIsInitialized] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const init = useCallback(async () => {
    try {
      // Create audio context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create analyser
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      setIsInitialized(true);
    } catch (error) {
      console.error("Error initializing audio visualizer:", error);
    }
  }, []);

  const createDemoAudio = useCallback(() => {
    // Create a demo audio using Web Audio API for visualization
    if (!audioContextRef.current || !analyserRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);
    
    // Create a complex tone for demo
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(220, audioContextRef.current.currentTime);
    
    // Gradually change frequency for effect
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContextRef.current.currentTime + 2);
    oscillator.frequency.exponentialRampToValueAtTime(220, audioContextRef.current.currentTime + 4);
    
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 10);

    return oscillator;
  }, []);

  const drawVisualization = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d')!;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyserRef.current) return;

      animationFrameRef.current = requestAnimationFrame(draw);

      analyserRef.current.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = 'rgba(10, 10, 10, 0.3)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

        // Create gradient for bars
        const gradient = canvasCtx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, '#D4AF37');
        gradient.addColorStop(1, '#F4D03F');

        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  }, [canvasRef]);

  const play = useCallback(async () => {
    try {
      if (!audioContextRef.current) {
        await init();
      }

      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // Create demo audio for visualization
      createDemoAudio();
      drawVisualization();
    } catch (error) {
      console.error("Error playing audio:", error);
      throw error;
    }
  }, [init, createDemoAudio, drawVisualization]);

  const pause = useCallback(() => {
    if (audioContextRef.current?.state === 'running') {
      audioContextRef.current.suspend();
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const stop = useCallback(() => {
    if (audioContextRef.current?.state === 'running') {
      audioContextRef.current.suspend();
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Clear canvas
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext('2d')!;
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [canvasRef]);

  return {
    init,
    play,
    pause,
    stop,
    isInitialized,
    audioContext: audioContextRef.current,
    analyser: analyserRef.current
  };
}

