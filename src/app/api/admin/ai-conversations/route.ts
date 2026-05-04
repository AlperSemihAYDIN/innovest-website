import { NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) return unauthorized();

  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const sessionId = searchParams.get('session_id');
  const keyword = searchParams.get('q');

  const snapshot = await adminDb
    .collection('ai_conversations')
    .orderBy('timestamp', 'desc')
    .limit(500)
    .get();

  type ConvDoc = { id: string; session_id?: string; timestamp?: string; user_message?: string; ai_response?: string; conversation_id?: string };
  let docs: ConvDoc[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ConvDoc));

  if (date) {
    docs = docs.filter(d => d.timestamp?.startsWith(date));
  }
  if (sessionId) {
    docs = docs.filter(d => d.session_id === sessionId);
  }
  if (keyword) {
    const kw = keyword.toLowerCase();
    docs = docs.filter(d =>
      d.user_message?.toLowerCase().includes(kw) ||
      d.ai_response?.toLowerCase().includes(kw)
    );
  }

  return Response.json(docs);
}
