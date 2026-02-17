import { uploadImage } from "./cloudinary.js";
import { addDoc, collection, db, getDocs, orderBy, query } from "./firebase-config.js";

window.sendMessage = async function() {
  const name = document.getElementById("senderName").value.trim();
  const msg = document.getElementById("messageInput").value.trim();
  const fileInput = document.getElementById("photoInput");

  if (!name || !msg) {
    alert("Nama & pesan wajib diisi 💙");
    return;
  }

  let photoUrl = ""; // Ubah null jadi string kosong agar Firebase tidak bingung
  if (fileInput.files[0]) {
    photoUrl = await uploadImage(fileInput.files[0]);
    
    // VALIDASI: Jika user pilih file tapi upload gagal, jangan lanjut simpan
    if (!photoUrl) {
      alert("Gagal mengunggah foto. Silakan coba lagi atau kirim tanpa foto.");
      return; 
    }
  }

  const themes = ["theme1","theme2","theme3"];
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];

  try {
    await addDoc(collection(db, "greetings"), { 
      name, 
      msg, 
      photo: photoUrl, // Sekarang aman, isinya string URL atau string kosong
      theme: randomTheme, 
      timestamp: new Date() 
    });

    // Reset Form
    document.getElementById("senderName").value = "";
    document.getElementById("messageInput").value = "";
    fileInput.value = "";
    document.getElementById("previewImage").style.display = "none";

    displayGreetings();
    if (typeof confetti === 'function') confetti(); // Cek apakah library confetti sudah load
  } catch (error) {
    console.error("Firebase Error:", error);
    alert("Gagal mengirim pesan ke Firebase.");
  }
};

const photoInput = document.getElementById("photoInput");
const preview = document.getElementById("previewImage");

photoInput.addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => { preview.src = e.target.result; preview.style.display = "block"; };
    reader.readAsDataURL(file);
  }
});

export async function displayGreetings() {
  const container = document.getElementById("messagesContainer");
  if (!container) return;

  container.innerHTML = "";
  const q = query(collection(db, "greetings"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  const stickers = ["🎂","💌","🎀","✨","🎉"];

  snapshot.forEach(doc => {
    const g = doc.data();
    const randomSticker = stickers[Math.floor(Math.random()*stickers.length)];

    const card = document.createElement("div");
    card.className = "birthday-card " + (g.theme || "theme1");
    card.innerHTML = `
      <div class="sticker">${randomSticker}</div>
      <strong>${g.name}</strong>
      <p>${g.msg}</p>
      ${g.photo ? `<img src="${g.photo}">` : ""}
    `;
    container.appendChild(card);
  });
}

displayGreetings();
