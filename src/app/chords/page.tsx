import { Metadata } from 'next';
import Link from 'next/link';
import { Music } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chords',
  description: 'Complete guitar chord library with diagrams and finger positions',
};

const chordCategories = [
  {
    name: 'Major Chords',
    chords: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    difficulty: 'beginner' as const,
  },
  {
    name: 'Minor Chords',
    chords: ['Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bm'],
    difficulty: 'beginner' as const,
  },
  {
    name: '7th Chords',
    chords: ['C7', 'D7', 'E7', 'F7', 'G7', 'A7', 'B7'],
    difficulty: 'intermediate' as const,
  },
  {
    name: 'Major 7th',
    chords: ['Cmaj7', 'Dmaj7', 'Emaj7', 'Fmaj7', 'Gmaj7', 'Amaj7', 'Bmaj7'],
    difficulty: 'intermediate' as const,
  },
  {
    name: 'Minor 7th',
    chords: ['Cm7', 'Dm7', 'Em7', 'Fm7', 'Gm7', 'Am7', 'Bm7'],
    difficulty: 'intermediate' as const,
  },
  {
    name: 'Suspended',
    chords: ['Csus2', 'Csus4', 'Dsus2', 'Dsus4', 'Esus2', 'Esus4', 'Gsus4', 'Asus2', 'Asus4'],
    difficulty: 'beginner' as const,
  },
  {
    name: 'Diminished',
    chords: ['Cdim', 'Ddim', 'Edim', 'Fdim', 'Gdim', 'Adim', 'Bdim'],
    difficulty: 'advanced' as const,
  },
  {
    name: 'Augmented',
    chords: ['Caug', 'Daug', 'Eaug', 'Faug', 'Gaug', 'Aaug', 'Baug'],
    difficulty: 'advanced' as const,
  },
  {
    name: 'Add & Special',
    chords: ['Cadd9', 'Dadd9', 'Gadd9', ' Gadd2', 'Dsus4', 'Asus2'],
    difficulty: 'intermediate' as const,
  },
];

const beginnerChords = ['C', 'G', 'D', 'A', 'E', 'Am', 'Em', 'Dm', 'G7', 'D7'];

export default function ChordsPage() {
  return (
    <div className='min-h-screen px-4 py-6 max-w-6xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white mb-2'>Chord Library</h1>
        <p className='text-gray-400'>
          Complete guitar chord reference with diagrams
        </p>
      </div>

      {/* Quick Access - Beginner Chords */}
      <section className='mb-10'>
        <h2 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-chord-beginner' />
          Beginner Essentials
        </h2>
        <div className='grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-3'>
          {beginnerChords.map((chord) => (
            <Link
              key={chord}
              href={`/chords/${chord.toLowerCase()}`}
              className='flex flex-col items-center justify-center aspect-square rounded-xl bg-surface-200 border border-surface-300 hover:border-chord-beginner/50 hover:bg-surface-100 transition-all duration-200'
            >
              <span className='font-mono font-bold text-white text-lg'>{chord}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Chord Categories */}
      <div className='space-y-10'>
        {chordCategories.map((category) => (
          <section key={category.name}>
            <h2 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
              {category.difficulty === 'beginner' && (
                <span className='w-2 h-2 rounded-full bg-chord-beginner' />
              )}
              {category.difficulty === 'intermediate' && (
                <span className='w-2 h-2 rounded-full bg-chord-default' />
              )}
              {category.difficulty === 'advanced' && (
                <span className='w-2 h-2 rounded-full bg-chord-advanced' />
              )}
              {category.name}
            </h2>
            <div className='grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3'>
              {category.chords.map((chord) => (
                <Link
                  key={chord}
                  href={`/chords/${chord.toLowerCase().replace('#', '-sharp')}`}
                  className='flex flex-col items-center justify-center aspect-square rounded-xl bg-surface-200 border border-surface-300 hover:border-primary-500/50 hover:bg-surface-100 transition-all duration-200'
                >
                  <span className='font-mono font-bold text-white text-lg'>{chord}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Chord Diagram Legend */}
      <section className='mt-12 p-6 rounded-xl bg-surface-200 border border-surface-300'>
        <h3 className='text-lg font-semibold text-white mb-4'>Reading Chord Diagrams</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400'>
          <div>
            <h4 className='font-medium text-white mb-2'>Vertical Lines</h4>
            <p>Represent the strings (left to right: low E to high E)</p>
          </div>
          <div>
            <h4 className='font-medium text-white mb-2'>Horizontal Lines</h4>
            <p>Represent the frets (top line is nut, others are frets)</p>
          </div>
          <div>
            <h4 className='font-medium text-white mb-2'>Dots</h4>
            <p>Show where to place your fingers</p>
          </div>
        </div>
      </section>
    </div>
  );
}

