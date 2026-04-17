import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate required fields
    const { firstname, email, phone, interest, budget } = data;
    if (!firstname || !email || !phone || !interest || !budget) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email' }, { status: 400 });
    }

    await adminDb.collection('contacts').add({
      firstname: String(firstname).slice(0, 200),
      email: String(email).slice(0, 200),
      phone: String(phone).slice(0, 50),
      city: String(data.city || '').slice(0, 100),
      budget: String(budget).slice(0, 100),
      interest: String(interest).slice(0, 200),
      message: String(data.message || '').slice(0, 2000),
      read: false,
      createdAt: new Date().toISOString(),
      source: req.headers.get('referer') || 'direct',
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : '';
    console.error('[contact] Error:', msg, stack);
    return Response.json({ error: 'Server error', detail: msg.slice(0, 500) }, { status: 500 });
  }
}
