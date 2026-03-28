// ====================== CONFIG ======================
const GEMINI_API_KEY = window.CONFIG?.GEMINI_API_KEY;

// ====================== PERFIL DO USUÁRIO ======================
const profile = {
    startTime: Date.now(),
    interactions: 0,
    maxScroll: 0
};

document.addEventListener("click", () => profile.interactions++);

window.addEventListener("scroll", () => {
    const scroll = window.scrollY + window.innerHeight;
    const height = document.body.scrollHeight;
    profile.maxScroll = Math.max(profile.maxScroll, scroll / height);
});

// ====================== GEMINI (VERSÃO ESTÁVEL) ======================
async function askGemini(prompt) {

    if (!GEMINI_API_KEY) {
        console.warn("API KEY não encontrada");
        return "Sistema não configurado.";
    }

    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                })
            }
        );

        if (!res.ok) {
            console.warn("Erro HTTP:", res.status);
            return "Instabilidade detectada.";
        }

        const data = await res.json();

        return data?.candidates?.[0]?.content?.parts?.[0]?.text
            || "A decisão já existe dentro de você.";

    } catch (e) {
        console.error("Erro Gemini:", e);
        return "Clareza precede controle.";
    }
}

// ====================== SISTEMA DE MENSAGEM NA TELA ======================
function showSystemMessage(text) {
    const msg = document.createElement("div");
    msg.className = "system-message";
    msg.innerText = text;

    document.body.appendChild(msg);

    setTimeout(() => msg.classList.add("visible"), 50);
    setTimeout(() => msg.classList.remove("visible"), 4000);
    setTimeout(() => msg.remove(), 5000);
}

// ====================== MENSAGEM INTELIGENTE WHATSAPP ======================
async function getSmartWhatsAppMessage() {

    const timeOnPage = Math.floor((Date.now() - profile.startTime) / 1000);
    const scroll = Math.round(profile.maxScroll * 100);
    const interactions = profile.interactions;

    const intent = (timeOnPage > 30 && scroll > 40) ? "decisor" : "explorando";

    const prompt = `
Usuário com perfil: ${intent}

Tempo no site: ${timeOnPage}s
Scroll: ${scroll}%
Interações: ${interactions}

Gere uma mensagem curta para WhatsApp demonstrando interesse real.
Tom: direto, sofisticado, estratégico.
Sem emojis.
`;

    const response = await askGemini(prompt);

    return encodeURIComponent(response);
}

// ====================== CTA COM PRÉ-FRAME ======================
async function handleCTA() {

    const preFrame = await askGemini(`
Usuário está prestes a entrar em contato.

Gere uma frase curta que aumente urgência e percepção de valor.
Tom: elite, direto, psicológico, sem clichê.
`);

    showSystemMessage(preFrame);

    setTimeout(async () => {

        const msg = await getSmartWhatsAppMessage();

        window.open(
            `https://wa.me/5512981216006?text=${msg}`,
            '_blank'
        );

    }, 1200);
}

// ====================== BOTÃO ======================
document.querySelectorAll(".cta-button").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        handleCTA();
    });
});

// ====================== PARTÍCULAS OTIMIZADAS ======================
function createFloatingParticle() {

    if (document.querySelectorAll('.floating-particle').length > 120) return;

    const p = document.createElement('div');
    p.className = 'floating-particle';

    p.style.left = `${Math.random() * 100}vw`;
    p.style.width = `${Math.random() * 6 + 3}px`;
    p.style.height = p.style.width;

    p.style.opacity = Math.random() * 0.6 + 0.3;
    p.style.animationDuration = `${Math.random() * 20 + 15}s`;

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 40000);
}

setInterval(() => {
    if (document.visibilityState === "visible") {
        createFloatingParticle();
    }
}, 160);