// ================= LOADER =================
const loaderText = document.getElementById("loader-text");

const sequence = [
    "INITIALIZING SYSTEM...",
    "Loading Cognitive Architecture...",
    "Mapping Decision Patterns...",
    "Calibrating Strategic Perception...",
    "Access Ready"
];

let i = 0;

function runLoader() {
    if (i < sequence.length) {
        loaderText.innerText = sequence[i++];
        setTimeout(runLoader, 700);
    } else {
        document.getElementById("loader").style.opacity = 0;
    }
}

runLoader();

// ================= INTENT =================
let intent = { depth: 0, focus: 0, hesitation: 0 };

window.addEventListener("scroll", () => {
    intent.depth = window.scrollY / document.body.scrollHeight;
});

let lastMove = 0;
document.addEventListener("mousemove", () => {
    const now = Date.now();
    if (now - lastMove < 40) intent.hesitation += 0.3;
    lastMove = now;
});

let focusTimer;
document.addEventListener("mousemove", () => {
    clearTimeout(focusTimer);
    focusTimer = setTimeout(() => intent.focus += 2, 1200);
});

function getIntentScore() {
    return intent.depth * 40 + intent.focus * 2 - intent.hesitation;
}

// ================= SESSION LOG =================
const sessionLog = {
    start: Date.now(),
    clicks: 0,
    maxScroll: 0,
    intentPeak: 0
};

document.addEventListener("click", () => sessionLog.clicks++);

window.addEventListener("scroll", () => {
    const s = window.scrollY / document.body.scrollHeight;
    if (s > sessionLog.maxScroll) sessionLog.maxScroll = s;
});

setInterval(() => {
    const score = getIntentScore();
    if (score > sessionLog.intentPeak) sessionLog.intentPeak = score;
}, 1000);

// ================= CTA =================
function updateCTA() {
    const btns = [document.getElementById("cta-main"), document.getElementById("cta-main-2")];

    const score = getIntentScore();

    let msg = "Solicito acesso estratégico";

    if (score > 80) msg = "Estou pronto para reconfiguração estratégica";
    else if (score > 60) msg = "Quero entender a arquitetura estratégica";

    const meta = `
[session]
tempo=${Math.floor((Date.now() - sessionLog.start) / 1000)}s
intencao=${Math.floor(sessionLog.intentPeak)}
scroll=${Math.floor(sessionLog.maxScroll * 100)}%
cliques=${sessionLog.clicks}
`;

    btns.forEach(btn => {
        if (btn) {
            btn.href = `https://wa.me/5512981216006?text=${encodeURIComponent(msg + meta)}`;
        }
    });
}

setInterval(updateCTA, 2000);

// ================= CONVERSION TRIGGER =================
let activated = false;

setInterval(() => {
    if (getIntentScore() > 60 && !activated) {
        activated = true;
        document.querySelectorAll(".cta").forEach(btn => {
            btn.innerText = "ACESSAR ARQUITETURA";
            btn.style.transform = "scale(1.05)";
        });
    }
}, 1500);