document.addEventListener("DOMContentLoaded", function () {

    /* ========= NAV & AUDIO SWITCH ========= */
    const musikBtns = document.querySelectorAll('button[data-section]');
    const audio = document.getElementById('bgMusic');

    musikBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const section = btn.dataset.section;
            if(section === "greet") {
                audio.play();
            } else {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    });

    /* ========= QUIZ (tetap lokal) ========= */
    const quizContainer = document.getElementById("quiz");
    if (quizContainer) {
        let score = 0;
        let answered = 0;
        const questions = [
            { q: "Febi paling suka warna apa?", options: ["Hitam", "Pink", "Merah"], answer: 0 },
            { q: "Febi paling ngefans sama siapa?", options: ["Taehyung", "Afgan", "Dikta"], answer: 2 },
            { q: "Febi paling suka makan apa?", options: ["Mie Ayam", "Seblak", "Dimsum"], answer: 1 },
            { q: "Febi paling suka dengerin lagu siapa?", options: ["Nosstress", "Tenxi", "Lyodra"], answer: 0 },
            { q: "Febi paling suka minum apa?", options: ["Susu", "Kopi", "Jus Alpukat"], answer: 1 },
            { q: "Febi paling sering bilang?", options: ["kalian tau ga?", "haii guyss!", "asli jir!"], answer: 1 }
        ];

        questions.forEach((item, index) => {
            const box = document.createElement("div");
            box.className = "quiz-box";
            box.innerHTML = `<p>${item.q}</p>`;

            item.options.forEach((opt, i) => {
                const btn = document.createElement("button");
                btn.textContent = opt;

                btn.onclick = () => {
                    if (i === item.answer) { btn.classList.add("correct"); score++; }
                    else { btn.classList.add("wrong"); }

                    answered++;
                    box.querySelectorAll("button").forEach(b => b.disabled = true);

                    if (answered === questions.length) showResult();
                };

                box.appendChild(btn);
            });

            function showResult() {
                const percentage = Math.round((score / questions.length) * 100);
                const resultBox = document.createElement("div");
                resultBox.className = "quiz-result";
                let message = "";

                if (percentage === 0) message = "🙃 Belum kenal Febi nih, yuk kenalan dulu!";
                else if (percentage == 17) message = "🙂 Baru kenal febi ya?... gas ajak febi ngobrol!😆";
                else if (percentage == 33) message = "🙂 YAhh... masih harus kenalan sama Febi nih!";
                else if (percentage == 50) message = "🙂 Lumayan... tapi masih harus lebih kenal lagi";
                else if (percentage == 67) message = "😊 Udah kenal Febi... tapi kayaknya kurang ngobrol bareng nih";
                else if (percentage == 83) message = "😍 Wahh kamu cukup kenal Febi!";
                else message = "💖 Perfect besties! Kamu si paling kenal Febi! ";

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
    const navButtons = document.querySelectorAll("nav button");

    navButtons.forEach(button => {
        button.addEventListener("click", function () {
            const target = this.dataset.section;
            sections.forEach(sec => sec.classList.remove("active"));
            document.getElementById(target).classList.add("active");
            navButtons.forEach(btn => btn.classList.remove("active"));
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
    window.confetti = function() {
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
    };

    /* ========= MEMORY GAME ========= */
    const board = document.getElementById("memoryBoard");
    if (board) {
        const emojis = ["🎂","🎉","💖","👑","🎁","🌸","✨","🍰"];
        let cards = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
        let flipped = [], lock = false, score = 0, moves = 0;

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
                            setTimeout(async () => {
                                const player = prompt("Masukkan nama kamu untuk leaderboard:");
                                if (player) {
                                    // pakai Firestore
                                    const { saveFlipScore } = await import("./flipLeaderboard.js");
                                    saveFlipScore(player, moves);
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
});
