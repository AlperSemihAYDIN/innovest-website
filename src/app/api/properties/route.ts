import { adminDb } from '@/lib/firebaseAdmin';
import { allProperties } from '@/lib/propertyData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  try {
    let query = adminDb.collection('properties') as FirebaseFirestore.Query;
    if (city) {
      query = query.where('city', '==', city);
    }
    const snapshot = await query.get();
    if (!snapshot.empty) {
      return Response.json(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    const fallback = city ? allProperties.filter((p) => p.city === city) : allProperties;
    return Response.json(fallback);
  } catch {
    const fallback = city ? allProperties.filter((p) => p.city === city) : allProperties;
    return Response.json(fallback);
  }
}
