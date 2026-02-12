import { Metadata } from 'next';
import Link from 'next/link';
import { User, Settings, LogOut, Music, Heart, Moon, Sun } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your account settings and preferences',
};

const menuItems = [
  { icon: Music, label: 'My Songs', href: '/favorites', badge: null },
  { icon: Heart, label: 'Favorites', href: '/favorites', badge: '0' },
  { icon: Moon, label: 'Dark Mode', href: '#', badge: 'On' },
  { icon: Settings, label: 'Settings', href: '#', badge: null },
];

export default function ProfilePage() {
  return (
    <div className='min-h-screen px-4 py-6 max-w-4xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-white mb-2'>Profile</h1>
        <p className='text-gray-400'>
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className='mb-8 p-6 rounded-xl bg-surface-200 border border-surface-300'>
        <div className='flex items-center gap-4'>
          <div className='w-20 h-20 rounded-full bg-primary-500/20 flex items-center justify-center'>
            <User className='w-10 h-10 text-primary-500' />
          </div>
          <div>
            <h2 className='text-xl font-semibold text-white'>Guest User</h2>
            <p className='text-gray-400 text-sm'>Sign in to sync your favorites</p>
          </div>
        </div>
        <button className='w-full mt-6 py-3 px-4 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors'>
          Sign In
        </button>
      </div>

      {/* Menu Items */}
      <div className='space-y-2'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className='flex items-center justify-between p-4 rounded-xl bg-surface-200 border border-surface-300 hover:border-primary-500/50 hover:bg-surface-100 transition-all duration-200'
            >
              <div className='flex items-center gap-4'>
                <Icon className='w-5 h-5 text-gray-400' />
                <span className='font-medium text-white'>{item.label}</span>
              </div>
              {item.badge && (
                <span className='px-3 py-1 rounded-full text-xs font-medium bg-surface-300 text-gray-400'>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Sign Out Button */}
      <button className='w-full mt-8 flex items-center justify-center gap-2 p-4 rounded-xl bg-surface-200 border border-surface-300 text-gray-400 hover:text-red-500 hover:border-red-500/50 transition-all duration-200'>
        <LogOut size={20} />
        <span className='font-medium'>Sign Out</span>
      </button>

      {/* App Info */}
      <div className='mt-12 text-center text-gray-500 text-sm'>
        <p>GuitarChords v1.0.0</p>
        <p className='mt-1'>Built with Next.js, TypeScript, and Tailwind</p>
      </div>
    </div>
  );
}

