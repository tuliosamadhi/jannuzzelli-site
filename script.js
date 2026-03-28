// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.5 - IA FORTE ======================

let profile = { time: 0, scrollDepth: 0, interactions: 0, intensity: 0 };

// ====================== LOADER ======================
const loaderText = document.getElementById("loader-text");
const sequence = ["INITIALIZING SYSTEM...", "Mapping Cognitive Layers...", "Synchronizing Intelligence...", "Access Protocol Ready"];
let step = 0;

function runLoader() {
    if (step < sequence.length) {
        loaderText.textContent = sequence[step++];
        setTimeout(runLoader, 750);
    } else {
        const loader = document.getElementById("loader");
        loader.style.transition = "opacity 1s";
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 1000);
    }
}
window.addEventListener("load", runLoader);

// ====================== CURSOR + ANIMAÇÕES ======================
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
if (dot && ring) {
    document.addEventListener("mousemove", e => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}

// Scan Line + Floating Particles
function createScanLine() {
    const scan = document.createElement('div');
    scan.className = 'scan-line';
    scan.style.top = `${Math.random() * 80 + 10}vh`;
    document.body.appendChild(scan);
    setTimeout(() => scan.remove(), 1800);
}
setInterval(() => { if (Math.random() > 0.35) createScanLine(); }, 2200);

function createFloatingParticle() {
    const p = document.createElement('div');
    p.className = 'floating-particle';
    p.style.left = `${Math.random() * 100}vw`;
    p.style.animationDuration = `${Math.random() * 30 + 25}s`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 60000);
}
setInterval(createFloatingParticle, 280);

// ====================== IA FORTE (Gemini) ======================
async function askGemini(prompt) {
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyB12Km76wnrnvxZ3XEoFVx6jpc-v7ITixc`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "A decisão já existe dentro de você.";
    } catch (e) {
        return "A decisão já existe dentro de você.";
    }
}

// Insight dinâmico no Hero
async function triggerInsight() {
    if (profile.intensity < 35) return;
    const prompt = `Usuário no site de Arquitetura Cognitiva. Tempo: ${profile.time}s. Gere frase curta, profunda e estratégica (máx 14 palavras).`;
    const text = await askGemini(prompt);
    const target = document.querySelector('.hero-highlight');
    if (text && target) {
        target.style.transition = "opacity 1s";
        target.style.opacity = "0";
        setTimeout(() => { target.textContent = text; target.style.opacity = "1"; }, 800);
    }
}

// ====================== FECHAMENTO INTELIGENTE WHATSAPP ======================
async function getClosingMessage() {
    const prompt = `Usuário demonstrou alta intenção. Tempo: ${profile.time}s. Gere mensagem curta e persuasiva para WhatsApp pedindo conversa estratégica com Túlio Jannuzzelli.`;
    const aiText = await askGemini(prompt);
    return encodeURIComponent(aiText || "Olá Túlio, gostaria de uma conversa estratégica.");
}

document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const message = await getClosingMessage();
        window.open(`https://wa.me/5512981216006?text=${message}`, '_blank');
    });
});

// ====================== TRACKING ======================
setInterval(() => { profile.time += 1; }, 1000);
window.addEventListener("scroll", () => {
    profile.scrollDepth = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (profile.intensity > 40) triggerInsight();
});
document.addEventListener("mousemove", () => { profile.interactions += 0.1; });

// ====================== INIT ======================
console.log("%c🧠 Cognitive System v0.5 - IA Forte Ativada", "color:#00f0ff; font-size:12px");
revealOnScroll();