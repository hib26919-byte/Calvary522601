import admin from "firebase-admin";

let app = null;

export function getAdminApp() {
  if (app) return app;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (projectId && clientEmail && privateKey) {
    app = admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey })
    });
  } else {
    app = admin.initializeApp({ projectId });
  }
  return app;
}

export function getDb() {
  return getAdminApp().firestore();
}

export default admin;
