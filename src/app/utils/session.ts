// utils/session.ts
import { NextRequest } from 'next/server'
import admin, { auth } from 'firebase-admin'

const uid = 'wleVzGN1zKM5RhmgWRTIr9V5Off2'

export default async function validateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value || ''

  // Validate if the cookie exist in the request
  if (!session) {
    throw new Error('Session cookie does not exist.');
  }

  // Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true)

  const user = await admin.auth().getUser(uid)


  if (user.customClaims && user.customClaims.admin === true) {
    return
  }

  await admin.auth().setCustomUserClaims(uid, { admin: true })


  if (!decodedClaims) {
    throw new Error('Session cookie is invalid.');
  }

  return decodedClaims;
}