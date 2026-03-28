// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.3 - VERSÃO ESTÁVEL ======================

let profile = { time: 0, scrollDepth: 0, interactions: 0, intensity: 0 };

// ====================== LOADER (corrigido e reforçado) ======================
const loaderText = document.getElementById("loader-text");
const sequence = [
    "INITIALIZING SYSTEM...",
    "Mapping Cognitive Layers...",
    "Synchronizing Intelligence...",
    "Access Protocol Ready"
];
let step = 0;

function runLoader() {
    if (step < sequence.length) {
        loaderText.textContent = sequence[step++];
        setTimeout(runLoader, 750);
    } else {
        // Finaliza o loader com segurança
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.transition = "opacity 0.8s ease";
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 900);
        }
    }
}

// Garante que o loader sempre rode
window.addEventListener("load", () => {
    runLoader();
});

// ====================== CURSOR ======================
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

if (dot && ring) {
    document.addEventListener("mousemove", (e) => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}

// ====================== REVEAL + PARALLAX ======================
function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;
    document.querySelectorAll(".section, .cta-final, .profile-section").forEach(el => {
        if (el.getBoundingClientRect().top < trigger) el.classList.add("active");
    });
}
window.addEventListener("scroll", revealOnScroll);

// Parallax backgrounds
window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const monogram = document.querySelector(".bg-monogram");
    const energy = document.querySelector(".bg-energy");
    if (monogram) monogram.style.transform = `translateY(${scroll * 0.15}px)`;
    if (energy) energy.style.transform = `translateY(${scroll * 0.08}px)`;
});

// ====================== ANIMAÇÕES QUE VOCÊ GOSTAVA ======================
// Scan Line
function createScanLine() {
    const scan = document.createElement('div');
    scan.className = 'scan-line';
    scan.style.top = `${Math.random() * 80 + 10}vh`;
    document.body.appendChild(scan);
    setTimeout(() => scan.remove(), 1800);
}
setInterval(() => { if (Math.random() > 0.4) createScanLine(); }, 2500);

// Floating Particles
function createFloatingParticle() {
    const p = document.createElement('div');
    p.className = 'floating-particle';
    p.style.left = `${Math.random() * 100}vw`;
    p.style.animationDuration = `${Math.random() * 30 + 25}s`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 60000);
}
setInterval(createFloatingParticle, 320);

// ====================== INTENSIDADE + AI (leve por enquanto) ======================
setInterval(() => { profile.time += 1; }, 1000);
window.addEventListener("scroll", () => {
    profile.scrollDepth = window.scrollY / (document.body.scrollHeight - window.innerHeight);
});
document.addEventListener("mousemove", () => { profile.interactions += 0.1; });

// ====================== FINAL INIT ======================
console.log("%c🧠 Cognitive System v0.3 - Versão Estável Carregada", "color:#00f0ff; font-size:11px");
revealOnScroll();