// utils/session.ts
import { NextRequest } from 'next/server'
import admin, { auth } from 'firebase-admin'

const uid = 'wleVzGN1zKM5RhmgWRTIr9V5Off2';

export default async function validateSession(request: NextRequest) {
// Set custom claim for the user
const customClaims = { admin: true };

 try {
    await admin.auth().setCustomUserClaims(uid, customClaims)
    console.log('Custom claim successfully set');
  } catch (error) {
    console.error('Error setting custom claim:', error);
  }

  const session = request.cookies.get('session')?.value || ''

  if (!session) {
    console.warn('Session cookie does not exist. Returning null.');
    return null;
  }

  // Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true)

  if (!decodedClaims) {
    throw new Error('Session cookie is invalid.');
  }

  return decodedClaims;
}

