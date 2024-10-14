import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '../../../sanity';  // Adjust the path if necessary

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Use the Sanity client to create a new document
    await sanityClient.create({
      _type: 'contact',
      name,
      email,
      message,
    });

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Sanity error:', error);
    return NextResponse.json({ message: 'Error submitting message' }, { status: 500 });
  }
}
