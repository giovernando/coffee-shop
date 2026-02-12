import { Metadata } from 'next';
import { Suspense } from 'react';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Songs',
  description: 'Search and browse millions of songs with accurate chords and lyrics',
};

interface SongsPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function SongsPage({ searchParams }: SongsPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const page = parseInt(params.page || '1', 10);

  return (
    <div className='min-h-screen px-4 py-6 max-w-4xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white mb-2'>Songs</h1>
        <p className='text-gray-400'>
          Search for songs with accurate chords and lyrics
        </p>
      </div>

      {/* Search Bar */}
      <form action='/songs' method='GET' className='mb-8'>
        <div className='relative'>
          <Search
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
            size={20}
          />
          <input
            type='search'
            name='q'
            defaultValue={query}
            placeholder='Search for a song...'
            className='w-full h-14 pl-12 pr-4 rounded-xl bg-surface-200 border border-surface-300 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 text-lg'
          />
        </div>
      </form>

      {/* Results or Empty State */}
      {query ? (
        <Suspense fallback={<SongResultsSkeleton />}>
          <SongResults query={query} page={page} />
        </Suspense>
      ) : (
        <div className='text-center py-16'>
          <Search className='w-16 h-16 text-gray-600 mx-auto mb-4' />
          <p className='text-gray-400 text-lg'>
            Start typing to search for songs
          </p>
        </div>
      )}
    </div>
  );
}

// Song Results Component (Server Component)
async function SongResults({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  // This would use the Genius API service
  // For now, showing placeholder
  return (
    <div>
      <p className='text-gray-400 mb-4'>
        Search results for "{query}"
      </p>
      <p className='text-gray-500 text-center py-8'>
        API integration required. Configure GENIUS_API_TOKEN in .env
      </p>
    </div>
  );
}

// Loading Skeleton
function SongResultsSkeleton() {
  return (
    <div className='space-y-4'>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className='flex items-start gap-4 p-4 rounded-xl bg-surface-200 animate-pulse'
        >
          <div className='w-16 h-16 rounded-lg bg-surface-300' />
          <div className='flex-1 space-y-2'>
            <div className='h-5 bg-surface-300 rounded w-3/4' />
            <div className='h-4 bg-surface-300 rounded w-1/2' />
          </div>
        </div>
      ))}
    </div>
  );
}

