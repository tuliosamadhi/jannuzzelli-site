// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.2 ======================
// Maximum Immersion Mode - Nível B + C

let profile = {
    time: 0,
    scrollDepth: 0,
    interactions: 0,
    intensity: 0
};

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// ====================== LOADER ======================
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
        setTimeout(() => {
            const loader = document.getElementById("loader");
            loader.style.opacity = "0";
            setTimeout(() => { loader.style.display = "none"; }, 800);
        }, 600);
    }
}
window.addEventListener("load", runLoader);

// ====================== CURSOR ======================
if (!isMobile) {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");

    document.addEventListener("mousemove", (e) => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}

// ====================== REVEAL + PARALLAX ======================
const reveals = document.querySelectorAll(".section, .cta-final, .profile-section");
function revealOnScroll() {
    const trigger = window.innerHeight * 0.8;
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < trigger) {
            el.classList.add("active");
        }
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

// ====================== MAGNETIC CTA ======================
document.querySelectorAll(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        btn.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });
});

// ====================== ANIMAÇÕES AVANÇADAS NÍVEL B + C ======================

// Mouse tracking global
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 100;
    mouseY = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${mouseX}%`);
    document.documentElement.style.setProperty('--mouse-y', `${mouseY}%`);
});

// 1. Parallax 3D no Hero
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 25;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        hero.style.transform = `perspective(1200px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
        hero.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    });
}

// 2. Scan Line dramática
function createScanLine() {
    const scan = document.createElement('div');
    scan.className = 'scan-line';
    scan.style.top = `${Math.random() * 80 + 10}vh`;
    document.body.appendChild(scan);
    setTimeout(() => scan.remove(), 2000);
}
setInterval(() => {
    if (Math.random() > 0.45) createScanLine();
}, 2200);

// 3. Floating Particles
function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = '100vh';
    particle.style.animationDuration = `${Math.random() * 25 + 20}s`;
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    particle.style.width = `${Math.random() * 5 + 3}px`;
    particle.style.height = particle.style.width;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 45000);
}
setInterval(createFloatingParticle, 280);

// 4. Cursor com rastro (eco cognitivo)
if (!isMobile) {
    let lastTrailTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime > 60) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 800);
            lastTrailTime = now;
        }
    });
}

// 5. Barra de Intensidade Cognitiva (visual inteligente)
function createIntensityBar() {
    const barContainer = document.createElement('div');
    barContainer.style.position = 'fixed';
    barContainer.style.bottom = '20px';
    barContainer.style.left = '50%';
    barContainer.style.transform = 'translateX(-50%)';
    barContainer.style.height = '2px';
    barContainer.style.width = '180px';
    barContainer.style.background = 'rgba(255,255,255,0.08)';
    barContainer.style.borderRadius = '2px';
    barContainer.style.zIndex = '9998';
    barContainer.style.overflow = 'hidden';

    const bar = document.createElement('div');
    bar.style.height = '100%';
    bar.style.width = '0%';
    bar.style.background = 'linear-gradient(90deg, #00c4ff, #00ff9d)';
    bar.style.transition = 'width 0.6s ease';
    barContainer.appendChild(bar);
    document.body.appendChild(barContainer);

    setInterval(() => {
        const intensity = Math.min(100, (profile.intensity || 0) * 1.8);
        bar.style.width = `${intensity}%`;
    }, 800);
}
createIntensityBar();

// 6. Mensagens do sistema inteligentes
const systemMessages = [
    "Pattern recognized...",
    "Cognitive alignment increasing...",
    "Signal strength: medium-high",
    "Intent detected",
    "You are inside the architecture..."
];

function spawnSystemMessage() {
    if ((profile.intensity || 0) < 22) return;
    const msg = document.createElement('div');
    msg.className = 'system-msg';
    msg.textContent = systemMessages[Math.floor(Math.random() * systemMessages.length)];
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 5200);
}
setInterval(spawnSystemMessage, 5800);

// ====================== ENGAGEMENT SYSTEM ======================
window.addEventListener("scroll", () => {
    const depth = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    profile.scrollDepth = depth;
    if (depth > 0.3) profile.interactions += 1;
    calculateIntensity();
});

setInterval(() => {
    profile.time += 1;
    calculateIntensity();
}, 1200);

document.addEventListener("mousemove", () => {
    profile.interactions += 0.08;
});

function calculateIntensity() {
    profile.intensity = profile.time * 0.4 + profile.scrollDepth * 12 + profile.interactions;
    if (profile.intensity > 45) document.body.classList.add("high-intent");
}

// ====================== FINAL INIT ======================
console.log("%c🧠 Cognitive System v0.2 — Maximum Immersion Mode Activated",
    "color:#00f0ff; font-size:11px; letter-spacing:1px;");

revealOnScroll(); // Força reveal inicial