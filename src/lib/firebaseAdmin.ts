import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type Auth } from 'firebase-admin/auth';

let _app: App | undefined;
let _db: Firestore | undefined;
let _auth: Auth | undefined;

function getPrivateKey(): string {
  // Try base64-encoded key first (production-safe)
  const b64 = process.env.FIREBASE_ADMIN_PRIVATE_KEY_B64;
  if (b64) return Buffer.from(b64, 'base64').toString('utf-8');
  // Fallback to raw key (local dev)
  return process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n') || '';
}

function getApp(): App {
  if (!_app) {
    if (getApps().length === 0) {
      _app = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: getPrivateKey(),
        }),
      });
    } else {
      _app = getApps()[0];
    }
  }
  return _app;
}

export const adminDb: Firestore = new Proxy({} as Firestore, {
  get(_, prop) {
    if (!_db) _db = getFirestore(getApp());
    return Reflect.get(_db, prop);
  },
});

export const adminAuth: Auth = new Proxy({} as Auth, {
  get(_, prop) {
    if (!_auth) _auth = getAuth(getApp());
    return Reflect.get(_auth, prop);
  },
});
