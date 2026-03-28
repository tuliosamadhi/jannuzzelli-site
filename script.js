// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.4 - IA FORTE ======================

let profile = {
    time: 0,
    scrollDepth: 0,
    interactions: 0,
    intensity: 0
};

const GEMINI_API_KEY = "AIzaSyB12Km76wnrnvxZ3XEoFVx6jpc-v7ITixc"; // ← Sua chave real

// ====================== LOADER ======================
const loaderText = document.getElementById("loader-text");
const sequence = [
    "INITIALIZING SYSTEM...",
    "Mapping Cognitive Layers...",
    "Synchronizing Intelligence...",
    "Calibrating Strategic Perception...",
    "Access Protocol Ready"
];
let step = 0;

function runLoader() {
    if (step < sequence.length) {
        loaderText.textContent = sequence[step++];
        setTimeout(runLoader, 750);
    } else {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.transition = "opacity 1s ease";
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 1000);
        }
    }
}
window.addEventListener("load", runLoader);

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
setInterval(() => { if (Math.random() > 0.4) createScanLine(); }, 2200);

// Floating Particles
function createFloatingParticle() {
    const p = document.createElement('div');
    p.className = 'floating-particle';
    p.style.left = `${Math.random() * 100}vw`;
    p.style.animationDuration = `${Math.random() * 30 + 25}s`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 60000);
}
setInterval(createFloatingParticle, 280);

// ====================== GEMINI IA FORTE ======================
async function askGemini(prompt) {
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "A decisão já existe dentro de você.";
    } catch (e) {
        console.warn("Gemini error:", e);
        return "A decisão já existe dentro de você.";
    }
}

// Insight inteligente no Hero
async function triggerDeepInsight() {
    if (profile.intensity < 35) return;

    const prompt = `Usuário está explorando o site de Arquitetura Cognitiva de Túlio Jannuzzelli.
Tempo no site: ${profile.time}s | Scroll: ${Math.round(profile.scrollDepth * 100)}% | Intensidade: ${Math.round(profile.intensity)}
Escreva uma frase curta (máx 16 palavras), profunda e estratégica sobre reconfiguração cognitiva. Tom místico-tecnológico de alta autoridade.`;

    const insight = await askGemini(prompt);
    const target = document.querySelector('.hero-highlight');
    if (insight && target) {
        target.style.transition = "opacity 1s";
        target.style.opacity = "0";
        setTimeout(() => {
            target.textContent = insight;
            target.style.opacity = "1";
        }, 800);
    }
}

// ====================== FECHAMENTO INTELIGENTE NO WHATSAPP ======================
async function getSmartWhatsAppMessage() {
    const prompt = `Usuário demonstrou alta intenção no site de Arquitetura Cognitiva Estratégica.
Tempo: ${profile.time}s | Scroll: ${Math.round(profile.scrollDepth * 100)}% | Intensidade cognitiva: ${Math.round(profile.intensity)}
Escreva uma mensagem curta, profissional e persuasiva (máx 3 linhas) para enviar no WhatsApp pedindo uma conversa estratégica com Túlio Jannuzzelli.`;

    const aiText = await askGemini(prompt) || "Olá Túlio, gostaria de conversar sobre arquitetura cognitiva estratégica.";
    return encodeURIComponent(aiText);
}

// Clique em qualquer CTA → mensagem inteligente
document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const message = await getSmartWhatsAppMessage();
        const url = `https://wa.me/5512981216006?text=${message}`;
        window.open(url, '_blank');
    });
});

// ====================== INICIALIZAÇÃO ======================
setInterval(() => { profile.time += 1; }, 1000);
window.addEventListener("scroll", () => {
    profile.scrollDepth = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (profile.intensity > 45) triggerDeepInsight();
});
document.addEventListener("mousemove", () => { profile.interactions += 0.12; });

console.log("%c🧠 Cognitive System v0.4 - IA Forte Ativada", "color:#00f0ff; font-size:12px; letter-spacing:1px;");

revealOnScroll();