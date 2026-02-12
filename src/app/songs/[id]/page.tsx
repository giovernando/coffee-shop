import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, Share2, Play, Pause } from 'lucide-react';
import { TransposeControl } from '@/components/song/TransposeControl';
import { AutoScrollControl } from '@/components/song/AutoScrollControl';

interface SongPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for popular songs (optional SSG)
export async function generateStaticParams() {
  // Return popular song IDs for SSG
  return [];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: SongPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Song - GuitarChords`,
    description: 'View chords and lyrics',
    openGraph: {
      title: 'Song - GuitarChords',
      description: 'View chords and lyrics',
    },
  };
}

// Mock song data - in production, fetch from Genius API
async function getSong(id: string) {
  // In production: fetch from Genius API
  // const song = await fetchSongById(id);
  
  // Mock data for demo
  return {
    id: parseInt(id),
    title: 'Wonderwall',
    artist: 'Oasis',
    album: '(What the Story) Morning Glory?',
    year: 1995,
    headerImageUrl: null,
    lyrics: `[Intro]
[Em7] [G] [sus4] [Cadd9]

[Verse 1]
Today is [Em7]gonna be the day
That they're [G]gonna throw it back to you
By now you [sus4]should've somehow
Realized what you gotta [Cadd9]do
I don't believe that [Em7]anybody
Feels the way I [G]do about you [Dsus4]now [Cadd9]

[Verse 2]
Backbeat the [Em7]word is on the street
That the [G]fire in your heart is out
I'm sure you've [sus4]heard it all before
But you never [Cadd9]had a doubt
I don't believe that [Em7]anybody
Feels the way I [G]do about you [Dsus4]now [Cadd9]

[Pre-Chorus]
And [Am7]all the roads we [Cadd9]have to walk are [G]winding
And [Am7]all the lights that [Cadd9]lead us there are [G]blinding
[Am7]I don't [Cadd9]believe it [G]ooh [Dsus4]

[Chorus]
Be[Em7]cause [G]maybe [Dsus4]
You're [Cadd9]gonna be the one that [Em7]saves me [G] [Dsus4] [Cadd9]
And [Em7]after [G]all [Dsus4]
You're my [Cadd9]wonderwall`,
    validated: true,
  };
}

export default async function SongPage({ params }: SongPageProps) {
  const resolvedParams = await params;
  const song = await getSong(resolvedParams.id);

  if (!song) {
    notFound();
  }

  return (
    <div className='min-h-screen pb-24'>
      {/* Header */}
      <header className='sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-surface-300'>
        <div className='flex items-center justify-between px-4 h-14'>
          <Link
            href='/songs'
            className='flex items-center gap-2 text-gray-400 hover:text-white transition-colors'
          >
            <ArrowLeft size={20} />
            <span className='hidden sm:inline'>Back</span>
          </Link>
          <h1 className='text-sm font-medium text-white truncate max-w-[200px]'>
            {song.title}
          </h1>
          <div className='flex items-center gap-2'>
            <button className='p-2 text-gray-400 hover:text-white transition-colors'>
              <Heart size={20} />
            </button>
            <button className='p-2 text-gray-400 hover:text-white transition-colors'>
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Song Info */}
      <div className='px-4 py-6 border-b border-surface-300'>
        <h1 className='text-2xl font-bold text-white mb-1'>{song.title}</h1>
        <p className='text-gray-400'>{song.artist}</p>
        {song.album && (
          <p className='text-gray-500 text-sm mt-1'>{song.album}</p>
        )}
      </div>

      {/* Transpose Control */}
      <TransposeControl 
        originalKey='Em' 
        onKeyChange={(key, semitones) => {
          console.log('Transpose to:', key, semitones);
        }}
      />

      {/* Auto-Scroll Control */}
      <AutoScrollControl 
        onScroll={() => {
          console.log('Auto-scroll triggered');
        }}
      />

      {/* Lyrics */}
      <article className='px-4 py-6'>
        <div className='font-mono text-base leading-loose text-white whitespace-pre-wrap'>
          {song.lyrics}
        </div>
      </article>

      {/* Song Info Footer */}
      <div className='px-4 py-6 border-t border-surface-300'>
        <p className='text-gray-500 text-sm'>
          Provided by Genius API • {song.year || 'N/A'}
        </p>
      </div>
    </div>
  );
}

