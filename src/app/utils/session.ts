// utils/session.ts
import { NextRequest } from 'next/server'
import { auth } from 'firebase-admin'

export default async function validateSession(request: NextRequest) {

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

