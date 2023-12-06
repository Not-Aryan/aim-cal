'use client'

import { ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  useSession, 
  useSupabaseClient, 
} from '@supabase/auth-helpers-react';
import { Button } from './ui/button'

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
  const supabase = useSupabaseClient(); // talk to supabase!

  const [isOpen, setOpen] = useState<boolean>(false)

  const toggleOpen = () => setOpen((prev) => !prev)

  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) toggleOpen()
  }, [pathname])

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen()
    }
  }

  async function googleSignIn() {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'https://www.googleapis.com/auth/calendar'
            }
        });

        if (error) throw error;
    } catch (error) {
        alert("Error logging in to Google provider with Supabase");
        console.error(error);
        }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className='sm:hidden'>
      <Menu
        onClick={toggleOpen}
        className='relative z-50 h-5 w-5 text-zinc-700'
      />

      {isOpen ? (
        <div className='fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full'>
          <ul className='absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8'>
            {!isAuth ? (
              <>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <Button
                    onClick={() =>
                      googleSignIn
                    }
                    className='flex items-center w-full font-semibold'
                    >
                    Sign in
                  </Button>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
              </>
            ) : (
              <>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <Link
                    onClick={signOut}
                    className='flex items-center w-full font-semibold'
                    href='/'>
                    Sign out
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
