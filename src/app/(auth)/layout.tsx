"use client";

import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation';
import Image from 'next/image'
import React from 'react'
import Link from 'next/link';

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main className='bg-neutral-100 min-h-screen'>
        <div className='mx-auto max-w-screen-2xl p-4'>
            <nav className='flex justify-between items-center'>
             <Image src="/logo.svg" height={56} width={152} alt='Logo' />
               <Button asChild variant="secondary">
                <Link href={isSignIn ? "/sign-up" : "sign-in"}>
                {isSignIn ? "Sign Up" : "Login"}
                </Link>
               </Button>
            </nav>
        </div>
        <div className='flex flex-col items-center justify-center pt-4 md:pt-14'>
        {children}
        </div>
    </main>
  )
}

export default AuthLayout