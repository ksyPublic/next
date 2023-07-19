// utils/session.ts
import { NextRequest } from 'next/server'
import admin, { auth } from 'firebase-admin'

export default async function validateSession(request: NextRequest) {
// // Set custom claim for the user
// const uid = 'wleVzGN1zKM5RhmgWRTIr9V5Off2';
// const customClaims = { admin: true };

//   admin.auth().setCustomUserClaims(uid, customClaims)
//   .then(() => {
//     console.log('Custom claim successfully set');
//   })
//   .catch((error) => {
//     console.error('Error setting custom claim:', error);
//   });

  const session = request.cookies.get('session')?.value || ''

  if (!session) {
    throw new Error('Session cookie does not exist.');
  }

  // Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true)

  if (!decodedClaims) {
    throw new Error('Session cookie is invalid.');
  }

  return decodedClaims;
}

