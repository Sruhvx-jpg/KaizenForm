'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';

interface LandingPageComponentProps {
  isAuthenticated: boolean;
}

export default function LandingPageComponent({ isAuthenticated }: LandingPageComponentProps) {
    const router = useRouter();

    const handleContinue = () => {
        if (isAuthenticated) {
            // User is authenticated, redirect to main page
            router.push('/main');
        } else {
            // User is not authenticated, redirect to signup
            router.push('/signup');
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-6">
            <div className="max-w-md text-center space-y-6 ">
                <h1 className="text-4xl font-bold text-foreground">Welcome to KaizenForm</h1>
                <p className="text-lg text-muted-foreground">
                    Streamline your workflow with our powerful form solutions.
                </p>
                <Button
                    size="lg"
                    onClick={handleContinue}
                    className="w-full"
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
