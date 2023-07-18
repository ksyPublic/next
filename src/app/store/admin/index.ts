import { initializeApp, getApps, cert  } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
    credential: cert({
        projectId: `${process.env.NEXT_PUBLIC_ADMIN_PROJECT_ID}`,
        clientEmail: `${process.env.NEXT_PUBLIC_ADMIN_CLIENT_EMAIL}`,
        privateKey: `${process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')}`,
     }),
     databaseURL: `${process.env.NEXT_PUBLIC_ADMIN_DATABASE_URL}`,
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}

export {
    getAuth
}


