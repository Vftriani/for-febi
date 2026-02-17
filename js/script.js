document.addEventListener("DOMContentLoaded", function () {

    // ambil semua tombol dan semua audiosection]');

const musik = document.querySelectorAll('button[data-section]');
const audio = document.getElementById('bgMusic');

musik.forEach(btn => {
  btn.addEventListener("click", function() {
    const section = btn.getAttribute('data-section');

    // kalau tombol Greet diklik → play
    if(section === "greet") {
      audio.play();
    } else {
      // selain Greet → stop musik
      audio.pause();
      audio.currentTime = 0; // reset ke awal
    }
  });
});


    

const quizContainer = document.getElementById("quiz");

if (quizContainer) {

    let score = 0;
    let answered = 0;

    const questions = [

        {
            q: "Febi paling suka warna apa?",
            options: ["Hitam", "Pink", "Merah"],
            answer: 0
        },
        {
            q: "Febi paling ngefans sama siapa?",
            options: ["Taehyung", "Afgan", "Dikta"],
            answer: 2
        },

        {
            q: "Febi paling suka makan apa?",
            options: ["Mie Ayam", "Seblak", "Dimsum"],
            answer: 1
        },
        {
            q: "Febi paling suka dengerin lagu siapa?",
            options: ["Nosstress", "Tenxi", "Lyodra"],
            answer: 0
        },
        {
            q: "Febi paling suka minum apa?",
            options: ["Susu", "Kopi", "Jus Alpukat"],
            answer: 1
        },
        {
            q: "Febi paling sering bilang?",
            options: ["kalian tau ga?", "haii guyss!", "asli jir!"],
            answer: 1
        }
    ];

    questions.forEach((item, index) => {

        const box = document.createElement("div");
        box.className = "quiz-box";
        box.innerHTML = `<p>${item.q}</p>`;

        item.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.textContent = opt;

           btn.onclick = () => {

    if (i === item.answer) {
        btn.classList.add("correct");
        score++; // tambah score kalau benar
    } else {
        btn.classList.add("wrong");
    }

    answered++; // hitung soal yang sudah dijawab

    const allButtons = box.querySelectorAll("button");
    allButtons.forEach(b => {
        b.disabled = true;
    });

    // kalau semua soal sudah dijawab
    if (answered === questions.length) {
        showResult();
    }
};



            box.appendChild(btn);
        });
    function showResult() {
    const percentage = Math.round((score / questions.length) * 100);

    const resultBox = document.createElement("div");
    resultBox.className = "quiz-result";

    let message = "";

    if (percentage === 0) {
        message = "🙃 Belum kenal Febi nih, yuk kenalan dulu!";
    }else if (percentage == 17) {
        message = "🙂 Baru kenal febi ya?... gas ajak febi ngobrol!😆";
    }else if (percentage == 50) {
        message = "🙂 Lumayan... tapi masih harus lebih kenal lagi";
    } else if (percentage == 33) {
        message = "🙂 YAhh... masih harus kenalan sama Febi nih!";
    }else if ( percentage == 67) {
        message = "😊 Udah kenal Febi... tapi kayaknya kurang ngobrol bareng nih";
    } else if (percentage == 83) {
        message = "😍 Wahh kamu cukup kenal Febi!";
    } else {
        message = "💖 Perfect besties! Kamu si paling kenal Febi! ";
    }

    resultBox.innerHTML = `
        <h3>Wah ternyata kamu .. 🎉</h3>
        <p style="margin-top:10px;">${message}</p>
        <p>${score} dari ${questions.length} soal benar</p>
    `;

    quizContainer.appendChild(resultBox);
}



        quizContainer.appendChild(box);
    });
}




    /* ========= SECTION SWITCH ========= */
    
    const sections = document.querySelectorAll("section");
    const buttons = document.querySelectorAll("nav button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {

            const target = this.dataset.section;

            // Hide all sections
            sections.forEach(sec => sec.classList.remove("active"));

            // Show selected
            document.getElementById(target).classList.add("active");

            // Update active nav style
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

        });
    });

    
    
    /* ========= COUNTDOWN ========= */
    const targetDate = new Date("2026-02-22T00:00:00");

    function updateCountdown() {
        const el = document.getElementById("countdown");
        if (!el) return;
    
        const now = new Date();
        const diff = targetDate - now;
    
        if (diff <= 0) {
            el.innerHTML = "🎉 Happy Birthday!";
            return;
        }
    
        const days = Math.floor(diff / (1000*60*60*24));
        const hours = Math.floor((diff / (1000*60*60)) % 24);
        const minutes = Math.floor((diff / (1000*60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        const milliseconds = diff % 1000;
    
        el.innerHTML = `
            <div class="time-box">${days}<span>d</span></div>
            <div class="time-box">${hours}<span>h</span></div>
            <div class="time-box">${minutes}<span>m</span></div>
            <div class="time-box">${seconds}<span>s</span></div>
            <div class="time-box ms">${milliseconds}</div>
        `;
    }
    
    setInterval(updateCountdown, 50);
    
    
    
    /* ========= CONFETTI ========= */
    
    function confetti() {
        for (let i = 0; i < 50; i++) {
            const conf = document.createElement("div");
            conf.style.position = "fixed";
            conf.style.width = "8px";
            conf.style.height = "8px";
            conf.style.background = `hsl(${Math.random()*360},100%,50%)`;
            conf.style.top = "0px";
            conf.style.left = Math.random()*100 + "vw";
            conf.style.zIndex = "9999";
            conf.style.borderRadius = "50%";
            document.body.appendChild(conf);
    
            let fall = setInterval(() => {
                conf.style.top = parseFloat(conf.style.top) + 5 + "px";
            }, 20);
    
            setTimeout(() => {
                clearInterval(fall);
                conf.remove();
            }, 2000);
        }
    }
    
    
    /* ========= GREETING ========= */
    
    window.sendMessage = function() {
        const name = document.getElementById("senderName").value;
        const msg = document.getElementById("messageInput").value;
        const fileInput = document.getElementById("photoInput");
    
        if(!name || !msg){
            alert("Nama & pesan wajib diisi 💙");
            return;
        }
        const reader = new FileReader();
    
        reader.onload = function(e) {
            const greetings = JSON.parse(localStorage.getItem("greetings")) || [];
    
            const themes = ["theme1","theme2","theme3"];

const randomTheme = themes[Math.floor(Math.random() * themes.length)];

greetings.push({
    name,
    msg,
    photo: e.target.result,
    theme: randomTheme
});

    
            localStorage.setItem("greetings", JSON.stringify(greetings));
            displayGreetings();
            confetti();
        };
    
        if (fileInput.files[0]) {
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            reader.onload({ target: { result: null } });
        }
    
        document.getElementById("senderName").value = "";
        document.getElementById("messageInput").value = "";
        fileInput.value = "";
    };

    const photoInput = document.getElementById("photoInput");
const preview = document.getElementById("previewImage");

photoInput.addEventListener("change", function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(e){
            preview.src = e.target.result;
            preview.style.display = "block";
        }
        reader.readAsDataURL(file);
    }
});

    function displayGreetings() {
        const stickers = ["🎂","💌","🎀","✨","🎉"];
const randomSticker = stickers[Math.floor(Math.random()*stickers.length)];

        const container = document.getElementById("messagesContainer");
        if (!container) return;
    
        container.innerHTML = "";
    
        const greetings = JSON.parse(localStorage.getItem("greetings")) || [];
    
        greetings.slice().reverse().forEach(g => {
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
    
    
    /* ========= MEMORY GAME ========= */
    
    const board = document.getElementById("memoryBoard");
    if (board) {
    
        const emojis = ["🎂","🎉","💖","👑","🎁","🌸","✨","🍰"];
        let cards = [...emojis, ...emojis];
        cards.sort(() => 0.5 - Math.random());
    
        let flipped = [];
        let lock = false;
        let score = 0;
        let moves = 0;
    
        cards.forEach(symbol => {
            const card = document.createElement("div");
            card.className = "memory-card";
            card.textContent = symbol;
    
            card.onclick = function() {
                if (lock || card.classList.contains("flipped")) return;
    
                card.classList.add("flipped");
                flipped.push(card);
    
                if (flipped.length === 2) {
                    moves++;
    
                    if (flipped[0].textContent === flipped[1].textContent) {
                        score++;
                        flipped = [];
    
                        if (score === 8) {
                            setTimeout(() => {
                        
                                const player = prompt("Masukkan nama kamu untuk leaderboard:");
                        
                                if (player) {
                                    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
                                    leaderboard.push({ player, moves });
                                    leaderboard.sort((a,b) => a.moves - b.moves);
                                    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
                                    displayLeaderboard();
                                }
                        
                                alert("🎉 Finished in " + moves + " moves!");
                        
                            }, 500);
                        }
                        
    
                    } else {
                        lock = true;
                        setTimeout(() => {
                            flipped.forEach(c => c.classList.remove("flipped"));
                            flipped = [];
                            lock = false;
                        }, 800);
                    }
                }
            };
    
            board.appendChild(card);
        });
    }

    function displayLeaderboard() {
        const boardDiv = document.getElementById("leaderboard");
        if (!boardDiv) return;
    
        const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    
        boardDiv.innerHTML = leaderboard.slice(0,5).map((p,i)=>
            `<p>${i+1}. ${p.player} - ${p.moves} moves</p>`
        ).join("");
    }
    
    displayLeaderboard();
    
    
    });
    