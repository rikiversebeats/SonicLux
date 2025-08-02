import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, Square, Volume2, Settings } from "lucide-react";
import { useAudioVisualizer } from "@/hooks/use-audio-visualizer";

interface AdvancedAudioVisualizerProps {
  className?: string;
}

type VisualizationMode = 'bars' | 'circular' | 'waveform' | 'particles';

export default function AdvancedAudioVisualizer({ className }: AdvancedAudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visualMode, setVisualMode] = useState<VisualizationMode>('bars');
  const [volume, setVolume] = useState(0.5);
  
  const {
    init,
    play,
    pause,
    stop,
    isInitialized,
    audioContext,
    analyser
  } = useAudioVisualizer(canvasRef);

  const drawBarsVisualization = useCallback((dataArray: Uint8Array, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const bufferLength = dataArray.length;
    ctx.fillStyle = 'rgba(10, 10, 10, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
      
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
      gradient.addColorStop(0, '#D4AF37');
      gradient.addColorStop(0.5, '#F4D03F');
      gradient.addColorStop(1, '#FFD700');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  }, []);

  const drawCircularVisualization = useCallback((dataArray: Uint8Array, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const bufferLength = dataArray.length;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.6;

    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bufferLength; i++) {
      const angle = (i / bufferLength) * Math.PI * 2;
      const barHeight = (dataArray[i] / 255) * radius * 0.5;
      
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barHeight);
      const y2 = centerY + Math.sin(angle) * (radius + barHeight);

      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, '#D4AF37');
      gradient.addColorStop(1, '#FFD700');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }, []);

  const drawWaveformVisualization = useCallback((dataArray: Uint8Array, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const bufferLength = dataArray.length;
    ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#D4AF37';
    ctx.beginPath();

    const sliceWidth = canvas.width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvas.height / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }, []);

  const drawParticlesVisualization = useCallback((dataArray: Uint8Array, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const bufferLength = dataArray.length;
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bufferLength; i += 4) {
      const x = (i / bufferLength) * canvas.width;
      const y = canvas.height / 2;
      const size = (dataArray[i] / 255) * 20;
      const opacity = dataArray[i] / 255;

      ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y + (Math.sin(Date.now() * 0.01 + i) * 50), size, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, []);

  const drawVisualization = useCallback(() => {
    if (!canvasRef.current || !analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyser) return;
      
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      switch (visualMode) {
        case 'bars':
          drawBarsVisualization(dataArray, canvas, ctx);
          break;
        case 'circular':
          drawCircularVisualization(dataArray, canvas, ctx);
          break;
        case 'waveform':
          drawWaveformVisualization(dataArray, canvas, ctx);
          break;
        case 'particles':
          drawParticlesVisualization(dataArray, canvas, ctx);
          break;
      }
    };

    draw();
  }, [analyser, visualMode, drawBarsVisualization, drawCircularVisualization, drawWaveformVisualization, drawParticlesVisualization]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (isPlaying) {
      drawVisualization();
    }
  }, [isPlaying, drawVisualization]);

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

  const visualModes = [
    { value: 'bars' as const, label: 'Frequency Bars' },
    { value: 'circular' as const, label: 'Circular Spectrum' },
    { value: 'waveform' as const, label: 'Waveform' },
    { value: 'particles' as const, label: 'Particle Field' }
  ];

  return (
    <div className={`luxury-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gradient mb-2">
            Advanced Audio Visualizer
          </h3>
          <p className="text-muted-foreground">
            Experience multiple visualization modes with real-time audio analysis
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={visualMode} onValueChange={(value: VisualizationMode) => setVisualMode(value)}>
            <SelectTrigger className="w-48 bg-dark-surface border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {visualModes.map(mode => (
                <SelectItem key={mode.value} value={mode.value}>
                  {mode.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="sm" className="text-primary">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Visualizer Canvas */}
      <div className="relative w-full h-64 bg-gradient-to-r from-primary/10 to-white/5 rounded-lg mb-6 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          width={800}
          height={256}
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-primary text-4xl mb-2">🎵</div>
              <p className="text-muted-foreground">Click Play to start visualization</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button
            onClick={handlePlay}
            disabled={isLoading || isPlaying}
            className="luxury-button"
            size="lg"
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

        <div className="flex items-center gap-3">
          <Volume2 className="w-4 h-4 text-primary" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 accent-primary"
          />
          <span className="text-sm text-muted-foreground min-w-[3ch]">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>

      {!isInitialized && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Initialize audio system by clicking Play
        </p>
      )}
    </div>
  );
  }
