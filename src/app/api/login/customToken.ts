import { customInitApp, getAuth } from '@/store/admin'
import { NextRequest, NextResponse } from 'next/server'

export default async function handler(req:NextRequest, res: NextResponse) {
  customInitApp();

  const { uid } = req.body;
  const auth = getAuth();
  try {
    const token = await auth.createCustomToken(uid);
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({
      error: `Failed to create custom token: ${error.message}`,
    });
  }
}

