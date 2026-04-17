import { adminDb } from '@/lib/firebaseAdmin';
import { guides as staticGuides } from '@/lib/knowledgeHubData';

export async function GET() {
  try {
    const snapshot = await adminDb.collection('guides').orderBy('category').get();
    if (!snapshot.empty) {
      return Response.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    return Response.json(staticGuides);
  } catch {
    return Response.json(staticGuides);
  }
}
