"use client"

import Navbar from '@/components/Navbar'
import { cn, constructMetadata } from '@/lib/utils'
import { Inter } from 'next/font/google'
import './globals.css'

// import 'react-loading-skeleton/dist/skeleton.css'
// import 'simplebar-react/dist/simplebar.min.css'

import { Toaster } from '@/components/ui/toaster'

import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const inter = Inter({ subsets: ['latin'] })

// export const metadata = constructMetadata()

const supabase = createClient(
  "https://uvsjbbavsqaiatbmobcn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c2piYmF2c3FhaWF0Ym1vYmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MjUzOTMsImV4cCI6MjAxNzQwMTM5M30.f0m4FcXda3JGwnCOAGvuuIPX4sVGbyD7u7rybTwXpSo" 
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='light'>
      <SessionContextProvider supabaseClient={supabase}>
        <body
            className={cn(
              'min-h-screen font-sans antialiased grainy',
              inter.className
            )}>
            <Toaster />
            <Navbar />
            {children}
        </body>
      </SessionContextProvider>
    </html>
  )
}
