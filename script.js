// ====================== CONFIG ======================
const GEMINI_API_KEY = window.CONFIG?.GEMINI_API_KEY; // não usado (mantido por compatibilidade)

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

// ====================== FAKE AI (IMEDIATA) ======================
function fakeAI(type = "observing") {

    const bank = {
        observing: [
            "Você está analisando mais do que deveria.",
            "Seu padrão de decisão está claro.",
            "Você busca precisão antes de agir."
        ],
        pressure: [
            "O tempo está jogando contra você.",
            "Decisão adiada é oportunidade perdida.",
            "Você já tem informação suficiente."
        ],
        closing: [
            "Isso já pode ser resolvido agora.",
            "Você está a um passo de avançar.",
            "Esse é o ponto de decisão."
        ]
    };

    const arr = bank[type] || bank.observing;
    return arr[Math.floor(Math.random() * arr.length)];
}

// ====================== IA REAL (HUGGING FACE) ======================
async function askGemini(prompt) {

    try {
        const res = await fetch(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 120,
                        temperature: 0.7
                    }
                })
            }
        );

        const data = await res.json();

        return data?.[0]?.generated_text || null;

    } catch (e) {
        console.error("Erro IA:", e);
        return null;
    }
}

// ====================== ENGINE HÍBRIDA ======================
async function askAI(prompt, context = "observing") {

    const instant = fakeAI(context);

    const real = await askGemini(prompt);

    return real || instant;
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

// ====================== CLASSIFICAÇÃO DE USUÁRIO ======================
function getUserIntent() {

    const time = (Date.now() - profile.startTime) / 1000;
    const scroll = profile.maxScroll * 100;
    const clicks = profile.interactions;

    if (time > 40 && scroll > 60 && clicks > 2) return "quente";
    if (time > 20 && scroll > 30) return "morno";

    return "frio";
}

// ====================== MENSAGEM INTELIGENTE WHATSAPP ======================
async function getSmartWhatsAppMessage() {

    const intent = getUserIntent();

    const prompt = `
Usuário classificado como: ${intent}

Gere uma mensagem de WhatsApp curta e direta.

Tom: executivo, estratégico.
Sem emojis.
`;

    const response = await askAI(prompt, "closing");

    return encodeURIComponent(response);
}

// ====================== CTA COM PRÉ-FRAME ======================
async function handleCTA() {

    const intent = getUserIntent();

    const preFrame = fakeAI(
        intent === "quente" ? "closing" : "pressure"
    );

    showSystemMessage(preFrame);

    setTimeout(async () => {

        const msg = await getSmartWhatsAppMessage();

        window.open(
            `https://wa.me/5512981216006?text=${msg}`,
            '_blank'
        );

    }, 1000);
}

// ====================== BOTÃO ======================
document.querySelectorAll(".cta-button").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        handleCTA();
    });
});

// ====================== ENTIDADE VIVA ======================
function entityLoop() {

    const intent = getUserIntent();

    let context = "observing";

    if (intent === "morno") context = "pressure";
    if (intent === "quente") context = "closing";

    if (Math.random() > 0.5) {
        showSystemMessage(fakeAI(context));
    }
}

setInterval(entityLoop, 10000);

// ====================== PARTÍCULAS MELHORADAS ======================
function createFloatingParticle() {

    if (document.querySelectorAll('.floating-particle').length > 160) return;

    const p = document.createElement('div');
    p.className = 'floating-particle';

    const size = Math.random() * 8 + 4;

    p.style.left = `${Math.random() * 100}vw`;
    p.style.top = `${Math.random() * 100}vh`;

    p.style.width = `${size}px`;
    p.style.height = `${size}px`;

    p.style.opacity = Math.random() * 0.8 + 0.4;

    p.style.background = `
        radial-gradient(circle,
        rgba(255,215,0,1) 0%,
        rgba(255,215,0,0.6) 40%,
        rgba(255,215,0,0) 70%)
    `;

    p.style.boxShadow = `
        0 0 10px rgba(255,215,0,0.8),
        0 0 20px rgba(255,215,0,0.4)
    `;

    p.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear`;

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 20000);
}

setInterval(() => {
    if (document.visibilityState === "visible") {
        createFloatingParticle();
    }
}, 80);