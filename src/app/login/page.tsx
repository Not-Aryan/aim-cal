"use client"

import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { useState } from 'react';

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

function Login() {
  const [ start, setStart ] = useState(new Date());
  const [ end, setEnd ] = useState(new Date());
  const [ eventName, setEventName ] = useState("");
  const [ eventDescription, setEventDescription ] = useState("");

  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();
  
  if(isLoading) {
    return <></>
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
        if (data) {
            // Fetch Google Calendar data
            // fetchGoogleCalendarData(data);
            alert(data)
        }
    } catch (error) {
        alert("Error logging in to Google provider with Supabase");
        console.error(error);
        }
    }

    async function fetchGoogleCalendarData(token: string) {
        try {
            const response = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            // Update component state or context with calendar data
            console.log(data);
            // You may want to handle state updates or other logic here
        } catch (error) {
            console.error('Error fetching calendar data:', error);
        }
    }

//   async function googleSignIn() {
//     await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         scopes: 'https://www.googleapis.com/auth/calendar'
//       }
//     }).then((data) => {
//         alert('sucess')
//         console.log(data)
//     }).catch((error) => {
//         alert("Error logging in to Google provider with Supabase");
//         console.log(error);
//     })
//   }

  async function signOut() {
    await supabase.auth.signOut();
  }

//   console.log(session);
//   console.log(start);
//   console.log(eventName);
//   console.log(eventDescription);

  return (

    <main className='mx-auto max-w-7xl md:p-10'>
            <div className='mt-8 gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
                    <h1 className='pb-14 max-w-5xl text-5xl font-bold md:text-5xl lg:text-6xl'>
                    Campus Events
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

                        <button onClick={() => googleSignIn()}>Sign In With Google</button>
                        </Table>
                    </div>
            </div>
        </main>
  );
}

export default Login;