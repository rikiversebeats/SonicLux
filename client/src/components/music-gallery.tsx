import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Play, 
  Heart, 
  Download, 
  Share2,
  Clock,
  Star,
  TrendingUp,
  Calendar
} from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  description: string;
  imageGradient: string;
  duration: string;
  genre: string;
  releaseDate: string;
  plays: number;
  rating: number;
  isExclusive?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
}

interface MusicGalleryProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  onPlayTrack: (track: Track) => void;
  className?: string;
}

export default function MusicGallery({ 
  tracks, 
  onTrackSelect, 
  onPlayTrack, 
  className 
}: MusicGalleryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [filterBy, setFilterBy] = useState('all');
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Animate elements on load
    const elements = document.querySelectorAll('.gallery-item');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate');
      }, index * 50);
    });
  }, [tracks]);

  const genres = [
    { value: 'all', label: 'All Genres' },
    ...Array.from(new Set(tracks.map(track => track.genre)))
      .map(genre => ({ value: genre, label: genre.charAt(0).toUpperCase() + genre.slice(1) }))
  ];

  const sortOptions = [
    { value: 'title', label: 'Title A-Z' },
    { value: 'artist', label: 'Artist A-Z' },
    { value: 'releaseDate', label: 'Release Date' },
    { value: 'plays', label: 'Most Played' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Tracks' },
    { value: 'new', label: 'New Releases' },
    { value: 'trending', label: 'Trending' },
    { value: 'exclusive', label: 'Exclusive' },
    { value: 'liked', label: 'Liked' }
  ];

  const filteredAndSortedTracks = tracks
    .filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           track.artist.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || track.genre === selectedGenre;
      
      let matchesFilter = true;
      switch (filterBy) {
        case 'new':
          matchesFilter = track.isNew || false;
          break;
        case 'trending':
          matchesFilter = track.isTrending || false;
          break;
        case 'exclusive':
          matchesFilter = track.isExclusive || false;
          break;
        case 'liked':
          matchesFilter = likedTracks.has(track.id);
          break;
      }
      
      return matchesSearch && matchesGenre && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'releaseDate':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case 'plays':
          return b.plays - a.plays;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const toggleLike = (trackId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedTracks = new Set(likedTracks);
    if (newLikedTracks.has(trackId)) {
      newLikedTracks.delete(trackId);
    } else {
      newLikedTracks.add(trackId);
    }
    setLikedTracks(newLikedTracks);
  };

  const formatPlays = (plays: number) => {
    if (plays > 1000000) return `${(plays / 1000000).toFixed(1)}M`;
    if (plays > 1000) return `${(plays / 1000).toFixed(1)}K`;
    return plays.toString();
  };

  const TrackCard = ({ track }: { track: Track }) => (
    <Card 
      className="luxury-card group cursor-pointer gallery-item opacity-0 transition-all duration-300"
      onClick={() => onTrackSelect(track)}
    >
      <CardContent className="p-4">
        <div className="relative">
          {/* Album Art */}
          <div 
            className="w-full aspect-square rounded-lg mb-4 relative overflow-hidden"
            style={{ background: track.imageGradient }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Button 
                size="lg" 
                className="luxury-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayTrack(track);
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Play
              </Button>
            </div>

            {/* Track Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {track.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
              {track.isTrending && <Badge className="bg-red-500 text-white">Trending</Badge>}
              {track.isExclusive && <Badge className="bg-purple-500 text-white">Exclusive</Badge>}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-white hover:text-primary bg-black/20 hover:bg-black/40"
                onClick={(e) => toggleLike(track.id, e)}
              >
                <Heart className={`w-4 h-4 ${likedTracks.has(track.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-white hover:text-primary bg-black/20 hover:bg-black/40"
                onClick={(e) => e.stopPropagation()}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-white hover:text-primary bg-black/20 hover:bg-black/40"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Track Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {track.title}
            </h3>
            <p className="text-primary font-medium">{track.artist}</p>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {track.description}
            </p>
            
            {/* Track Stats */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{track.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{formatPlays(track.plays)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{track.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TrackListItem = ({ track }: { track: Track }) => (
    <Card 
      className="luxury-card group cursor-pointer gallery-item opacity-0 transition-all duration-300"
      onClick={() => onTrackSelect(track)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Album Art */}
          <div 
            className="w-16 h-16 rounded-lg flex-shrink-0 relative overflow-hidden"
            style={{ background: track.imageGradient }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Button 
                size="sm" 
                className="luxury-button p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayTrack(track);
                }}
              >
                <Play className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {track.title}
                </h3>
                <p className="text-primary font-medium">{track.artist}</p>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                  {track.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                {track.isNew && <Badge className="bg-green-500 text-white text-xs">New</Badge>}
                {track.isTrending && <Badge className="bg-red-500 text-white text-xs">Trending</Badge>}
                {track.isExclusive && <Badge className="bg-purple-500 text-white text-xs">Exclusive</Badge>}
              </div>
            </div>
            
            {/* Track Stats */}
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{track.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{formatPlays(track.plays)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{track.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-primary p-1"
                  onClick={(e) => toggleLike(track.id, e)}
                >
                  <Heart className={`w-4 h-4 ${likedTracks.has(track.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-primary p-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-primary p-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tracks, artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-dark-surface border-border"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-2">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-32 bg-dark-surface border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {genres.map(genre => (
                  <SelectItem key={genre.value} value={genre.value}>
                    {genre.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-32 bg-dark-surface border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map(filter => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 bg-dark-surface border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(sort => (
                  <SelectItem key={sort.value} value={sort.value}>
                    {sort.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="border-primary"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="border-primary"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredAndSortedTracks.length} of {tracks.length} tracks
        </p>
        
        {likedTracks.size > 0 && (
          <p className="text-sm text-primary">
            {likedTracks.size} tracks liked
          </p>
        )}
      </div>

      {/* Track Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {filteredAndSortedTracks.map((track) => (
          viewMode === 'grid' ? (
            <TrackCard key={track.id} track={track} />
          ) : (
            <TrackListItem key={track.id} track={track} />
          )
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedTracks.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-xl font-semibold mb-2">No tracks found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button
            onClick={() => {
              setSearchTerm('');
              setSelectedGenre('all');
              setFilterBy('all');
            }}
            variant="outline"
            className="border-primary text-primary"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
