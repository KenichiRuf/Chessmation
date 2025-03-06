import { NextResponse } from 'next/server';
import { signIn } from '@/app/(login)/actions';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('redirect', 'false'); // Tell signIn not to redirect

        try {
            const result = await signIn({ email, password }, formData);
            
            if (result && 'error' in result) {
                return NextResponse.json({ error: result.error }, { status: 400 });
            }

            // Don't redirect, just return success
            return NextResponse.json({ 
                success: true,
                message: 'Login successful'
            });
        } catch (error: any) {
            // If it's a redirect error, consider it a success
            // (since that means authentication worked)
            if (error.digest?.includes('NEXT_REDIRECT')) {
                return NextResponse.json({ 
                    success: true,
                    message: 'Login successful'
                });
            }
            throw error;
        }

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' }, 
            { status: 500 }
        );
    }
}
