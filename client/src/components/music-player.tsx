import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Shuffle,
  Heart,
  MoreVertical
} from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  imageGradient: string;
  audioUrl?: string;
}

interface MusicPlayerProps {
  playlist: Track[];
  currentTrackIndex: number;
  onTrackChange: (index: number) => void;
  className?: string;
}

export default function MusicPlayer({ 
  playlist, 
  currentTrackIndex, 
  onTrackChange, 
  className 
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeat, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      onTrackChange(randomIndex);
    } else {
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      onTrackChange(nextIndex);
    }
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      // If more than 3 seconds in, restart current track
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
      }
    } else {
      const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
      onTrackChange(prevIndex);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card className={`luxury-card ${className}`}>
      <CardContent className="p-6">
        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={currentTrack?.audioUrl || ""}
          preload="metadata"
        />

        <div className="flex items-center gap-6">
          {/* Album Art and Track Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div 
              className="w-16 h-16 rounded-lg flex-shrink-0"
              style={{ background: currentTrack?.imageGradient || 'linear-gradient(45deg, #D4AF37, #F4D03F)' }}
            />
            
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-foreground truncate">
                {currentTrack?.title || 'No Track Selected'}
              </h4>
              <p className="text-sm text-muted-foreground truncate">
                {currentTrack?.artist || 'Unknown Artist'}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`flex-shrink-0 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Main Controls */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsShuffle(!isShuffle)}
                className={`${isShuffle ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <Shuffle className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                className="text-foreground hover:text-primary"
              >
                <SkipBack className="w-5 h-5" />
              </Button>

              <Button
                onClick={togglePlayPause}
                className="luxury-button w-12 h-12 rounded-full p-0"
                disabled={!currentTrack}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                className="text-foreground hover:text-primary"
              >
                <SkipForward className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsRepeat(!isRepeat)}
                className={`${isRepeat ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <Repeat className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 w-80">
              <span className="text-xs text-muted-foreground w-10 text-right">
                {formatTime(currentTime)}
              </span>
              
              <div
                ref={progressRef}
                onClick={handleProgressClick}
                className="flex-1 h-1 bg-muted rounded-full cursor-pointer relative group"
              >
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-150"
                  style={{ width: `${progressPercent}%` }}
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${progressPercent}%`, marginLeft: '-6px' }}
                />
              </div>
              
              <span className="text-xs text-muted-foreground w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume and More Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="text-muted-foreground hover:text-primary"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);
                  setVolume(newVolume);
                  if (newVolume > 0) setIsMuted(false);
                }}
                className="w-20 accent-primary"
              />
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
