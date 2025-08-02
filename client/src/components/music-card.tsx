import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Heart } from "lucide-react";

interface MusicCardProps {
  title: string;
  artist: string;
  description: string;
  imageGradient: string;
  duration?: string;
  className?: string;
}

export default function MusicCard({ 
  title, 
  artist, 
  description, 
  imageGradient,
  duration = "3:42",
  className 
}: MusicCardProps) {
  return (
    <Card className={`luxury-card group cursor-pointer ${className}`}>
      <CardContent className="p-6">
        {/* Album Art Placeholder */}
        <div 
          className="w-full h-48 rounded-lg mb-4 relative overflow-hidden"
          style={{ background: imageGradient }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button size="lg" className="luxury-button">
              <Play className="w-5 h-5 mr-2" />
              Play
            </Button>
          </div>
          <div className="absolute top-3 right-3">
            <Button size="sm" variant="ghost" className="text-white hover:text-primary">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Track Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-primary font-medium">{artist}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">{duration}</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs text-primary">High Quality</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

