# GuitarChords Platform - Production-Ready PWA

A professional Progressive Web App for guitar chords and songs, built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and add your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add:

- **Supabase**: Create a project at [supabase.com](https://supabase.com) and add your URL and anon key
- **Genius API**: Get a token at [genius.com/api-clients](https://genius.com/api-clients)

### 3. Set Up Database

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create favorites table
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  song_id TEXT NOT NULL,
  song_title TEXT NOT NULL,
  song_artist TEXT NOT NULL,
  WITH TIME ZONE created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 PWA Installation

The app is PWA-ready. To install:

**Mobile:**
- Chrome (Android): Tap menu → "Install App" or "Add to Home Screen"
- Safari (iOS): Tap Share → "Add to Home Screen"

**Desktop:**
- Chrome: Menu → "Install GuitarChords"
- Edge: Menu → "Apps" → "Install this site as an app"

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── chords/            # Chord library pages
│   ├── songs/             # Song search and details
│   ├── favorites/         # User favorites (protected)
│   └── profile/           # User profile
├── components/
│   ├── navigation/        # BottomNav, TopNav
│   ├── song/              # Song display components
│   ├── chord/             # Chord components
│   └── ui/                # Reusable UI components
├── hooks/                  # Custom React hooks
│   ├── useTranspose.ts   # Chord transposition
│   └── useAutoScroll.ts  # Smooth auto-scroll
├── services/
│   └── genius.ts         # Genius API integration
├── lib/
│   ├── supabase/         # Supabase client
│   └── utils.ts          # Utility functions
├── types/                  # TypeScript definitions
└── utils/
    ├── transpose.ts       # Chord transposition engine
    └── validation.ts      # Data validation pipeline
```

## 🎸 Core Features

### Chord Transposition
- Professional -12 to +12 semitone transposition
- Easy Mode key suggestions (G, C, D, A, E)
- Support for all chord types (maj, min, 7, sus, dim, aug, slash)
- Memoized for performance

### Auto-Scroll
- requestAnimationFrame-based (no setInterval)
- Adjustable speed (0.5x - 3x)
- Respects prefers-reduced-motion
- Pauses on manual scroll

### Data Validation
- Multi-step validation pipeline
- Metadata validation
- Lyrics integrity check
- Graceful fallback handling

### Offline Support
- Service Worker for caching
- IndexedDB for favorites
- Stale-while-revalidate strategy

## 🎨 Design System

- **Dark Mode Default**: Professional dark theme
- **Mobile-First**: Optimized for touch
- **Responsive**: Desktop top nav, mobile bottom nav
- **Typography**: Sans-serif UI, monospace for chords
- **Spacing**: 4px scale system

## 🔒 Security

- Supabase Row Level Security (RLS)
- Authenticated favorites access
- Environment variable protection

## 📊 Performance

- Server Components by default
- Lazy loading for routes
- Optimized images with next/image
- Minimal JavaScript bundle

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth + Database)
- **API**: Genius API for songs/lyrics
- **PWA**: Service Worker + Manifest
- **State**: Zustand + React hooks

## 📦 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Genius API

1. Create an app at [genius.com/api-clients](https://genius.com/api-clients)
2. Get your access token
3. Add to `.env.local`: `GENIUS_API_TOKEN=your_token`

### Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy project URL and anon key to `.env.local`
3. Run the SQL setup script

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

Built with ❤️ for guitarists everywhere.

