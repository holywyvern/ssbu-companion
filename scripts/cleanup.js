const { initializeApp, cert } = require("firebase-admin/app");
const { getDatabase } = require("firebase-admin/database");
// Initialize with service account credentials stored in GitHub Secrets
initializeApp({
  credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  databaseURL: "https://ssbu-companion-default-rtdb.firebaseio.com"
});

const db = getDatabase();

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; 

async function cleanupLobbies() {
  const lobbiesRef = db.ref("lobbies");
  const snapshot = await lobbiesRef.once("value");
  const now = Date.now();
  const updates = {};

  snapshot.forEach((childSnapshot) => {
    const lobby = childSnapshot.val();
    const lobbyId = childSnapshot.key;
    if (lobby && lobby.createdAt && now - lobby.createdAt > ONE_DAY_IN_MS) {
      updates[lobbyId] = null;
    }
  });

  await lobbiesRef.update(updates);
}

cleanupLobbies().then(() => {
  console.log("Cleanup completed successfully.");
  process.exit(0);
}).catch((error) => {
  console.error("Error during cleanup:", error);
  process.exit(1);
});