import { adminDb } from '@/lib/firebaseAdmin';
import { articles as staticArticles } from '@/lib/articleData';

export async function GET() {
  try {
    const snapshot = await adminDb.collection('articles').orderBy('date', 'desc').get();
    if (!snapshot.empty) {
      return Response.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    return Response.json(staticArticles);
  } catch {
    return Response.json(staticArticles);
  }
}
