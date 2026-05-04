import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { session_id, conversation_id, user_message, ai_response } = data;

    if (!session_id || !user_message || !ai_response) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await adminDb.collection('ai_conversations').add({
      session_id: String(session_id).slice(0, 100),
      conversation_id: String(conversation_id || session_id).slice(0, 100),
      user_message: String(user_message).slice(0, 2000),
      ai_response: String(ai_response).slice(0, 5000),
      timestamp: new Date().toISOString(),
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Failed to log conversation' }, { status: 500 });
  }
}
