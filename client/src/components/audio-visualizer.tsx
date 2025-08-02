import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square } from "lucide-react";
import { useAudioVisualizer } from "@/hooks/use-audio-visualizer";

interface AudioVisualizerProps {
  className?: string;
}

export default function AudioVisualizer({ className }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    init,
    play,
    pause,
    stop,
    isInitialized,
    audioContext,
    analyser
  } = useAudioVisualizer(canvasRef);

  useEffect(() => {
    init();
  }, [init]);

  const handlePlay = async () => {
    setIsLoading(true);
    try {
      await play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePause = () => {
    pause();
    setIsPlaying(false);
  };

  const handleStop = () => {
    stop();
    setIsPlaying(false);
  };

  // Animated bars for visual effect when no audio is playing
  const AnimatedBars = () => (
    <div className="flex items-end justify-center h-full px-8">
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="visualizer-bar mx-1"
          style={{
            height: `${Math.random() * 40 + 20}px`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className={`luxury-card p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gradient mb-2">
          Interactive Audio Experience
        </h3>
        <p className="text-muted-foreground">
          Experience music like never before with our advanced audio visualizer
        </p>
      </div>

      {/* Visualizer Canvas */}
      <div className="relative w-full h-48 bg-gradient-to-r from-primary/10 to-white/5 rounded-lg mb-6 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          width={800}
          height={200}
        />
        {!isPlaying && <AnimatedBars />}
      </div>

      {/* Audio Controls */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={handlePlay}
          disabled={isLoading || isPlaying}
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Play className="w-4 h-4 mr-2" />
          Play
        </Button>
        
        <Button
          onClick={handlePause}
          disabled={!isPlaying}
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Pause className="w-4 h-4 mr-2" />
          Pause
        </Button>
        
        <Button
          onClick={handleStop}
          disabled={!isPlaying}
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Square className="w-4 h-4 mr-2" />
          Stop
        </Button>
      </div>

      {!isInitialized && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Click Play to initialize audio visualizer
        </p>
      )}
    </div>
  );
}

