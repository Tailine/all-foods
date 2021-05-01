import * as firebaseAdmin from 'firebase-admin'

import * as serviceAccount from './secret.json'

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id
    }),
    databaseURL: `https://${process.env.NEXT_PUBLIC_APP_ID}.firebaseio.com`
  })
}

export default firebaseAdmin
