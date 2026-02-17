import { addDoc, collection, db, getDocs, orderBy, query } from "./firebase-config.js";

export async function saveFlipScore(player, moves) {
  await addDoc(collection(db, "flipLeaderboard"), { player, moves, timestamp: new Date() });
  displayLeaderboard();
}

export async function displayLeaderboard() {
  const boardDiv = document.getElementById("leaderboard");
  if (!boardDiv) return;

  const q = query(collection(db, "flipLeaderboard"), orderBy("moves", "asc"));
  const snapshot = await getDocs(q);

  const leaderboard = [];
  snapshot.forEach(doc => leaderboard.push(doc.data()));

  boardDiv.innerHTML = leaderboard.slice(0,5)
    .map((p,i)=>`<p>${i+1}. ${p.player} - ${p.moves} moves</p>`).join("");
}

displayLeaderboard();
