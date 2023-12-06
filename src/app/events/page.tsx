"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
  
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]

  const Page = () => {
    const session = useSession(); // tokens, when session exists we have a user
    const supabase = useSupabaseClient(); // talk to supabase!
    const { isLoading } = useSessionContext();

    const [newEvents, setNewEvents] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                try {
                    const gcal_response = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
                        headers: {
                            'Authorization': `Bearer ${session.provider_token}`
                        }
                    });
                    if (!gcal_response.ok) {
                        throw new Error(`HTTP error! status: ${gcal_response.status}`);
                    }
                    const user_cal_data = await gcal_response.json();
                    console.log(user_cal_data);

                    const ml_res = await fetch('http://127.0.0.1:5000/process-cal', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ user_cal: user_cal_data }),
                    });
                    const newEvent_data = await ml_res.json();

                    setNewEvents(newEvent_data);

                } catch (error) {
                    console.error('Error fetching calendar data:', error);
                }
            }
        };

        fetchData();
    }, [session]); // Dependency array includes supabase to ensure updated instance

    async function signOut() {
      await supabase.auth.signOut();
    }

    return (
        <main className='mx-auto max-w-7xl md:p-10'>
            <div className='mt-8 gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>

                    {session ?
                        <>
                          <h1 className='pb-14 max-w-5xl text-5xl font-bold md:text-5xl lg:text-6xl'>
                          Campus Events for {session.user.email}
                          </h1>
                          <div className='rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                            <Table className="bg-white text-lg">
                                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Tag</TableHead>
                                    <TableHead>Info</TableHead>
                                    <TableHead className="text-right">Add To Calendar</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invoices.map((invoice) => (
                                    <TableRow key={invoice.invoice}>
                                        <TableCell className="font-large">{invoice.invoice}</TableCell>
                                        <TableCell>{invoice.paymentStatus}</TableCell>
                                        <TableCell>{invoice.paymentMethod}</TableCell>
                                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                                {/* <TableFooter>
                                    <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">$2,500.00</TableCell>
                                    </TableRow>
                                </TableFooter> */}
                            </Table>
                          </div>
                          {/* <div className="mt-10">
                            <Link
                              href='/'
                              onClick={signOut}
                              className={buttonVariants({
                                size: 'sm',
                              })}>
                              Sign Out
                            </Link>
                          </div> */}
                        </>
                        :
                        <>
                          <Link
                            className={buttonVariants({
                              size: 'lg',
                              className: 'mt-5',
                            })}
                            href='/login'
                            target='_blank'>
                            Login
                          </Link>
                        </>
                    }
            </div>
        </main>
        
      )
  }
  
  export default Page