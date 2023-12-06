import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Button, buttonVariants } from './ui/button'
import { 
  useSession, 
  useSupabaseClient, 
} from '@supabase/auth-helpers-react';
import { ArrowRight } from 'lucide-react'
import MobileNav from './MobileNav'

const Navbar = () => {
  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!

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
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span>Recommalendar.</span>
          </Link>

          <MobileNav isAuth={!!session} />

          <div className='hidden items-center space-x-4 sm:flex'>
            {session ? 
            <>
              <Link
                  href='/'
                  onClick={signOut}
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Sign Out{' '}
                </Link>
            </>:
            <>
              <Button
                  onClick={googleSignIn}
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Login{' '}
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Button>
            </>
            }
              
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
