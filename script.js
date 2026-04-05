// ====================== JANNUNZELLI COGNITIVE SYSTEM v1.0 ======================

// ====================== IMPORTS ======================
import { updateProfile, getUserType } from './js/profile-engine.js';

// ====================== LANGUAGE ======================
const isEnglishPage = window.location.pathname.includes('/en/') || document.documentElement.lang === 'en';

// ====================== MEMORY ======================
let memory = [];
let lastPersona = null;

let cognitiveState = {
    intensity: 1,
    depth: 1
};

// ====================== DESIGN TOKENS ======================
const UI = {
    accent: "#00F0FF",
    text: "#E6F7FF",
    danger: "#FF3B3B",
    warning: "#FFD166"
};

// ====================== LOADER ======================
const loaderText = document.getElementById("loader-text");

const sequence = isEnglishPage
    ? [
        "INITIALIZING SYSTEM...",
        "Mapping Cognitive Layers...",
        "Synchronizing Intelligence...",
        "Calibrating Strategic Perception...",
        "Access Protocol Ready"
    ]
    : [
        "INICIALIZANDO SISTEMA...",
        "Mapeando Camadas Cognitivas...",
        "Sincronizando Inteligência...",
        "Calibrando Percepção Estratégica...",
        "Protocolo de Acesso Pronto"
    ];

let step = 0;

function runLoader() {
    if (loaderText && step < sequence.length) {
        loaderText.textContent = sequence[step++];
        setTimeout(runLoader, 700);
    } else {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 900);
        }
    }
}

window.addEventListener("load", runLoader);

// ====================== PROFILE ======================
updateProfile();

// ====================== LANGUAGE DETECTION ======================
function detectLanguage(query) {
    const hasEN = /\b(the|is|are|how|what|why)\b/i.test(query);
    const hasPT = /\b(o|a|como|por que|qual)\b/i.test(query);

    if (hasEN && !hasPT) return "en";
    if (hasPT && !hasEN) return "pt";

    return isEnglishPage ? "en" : "pt";
}

// ====================== INTENT ======================
function detectIntent(query) {
    const q = query.toLowerCase();

    if (q.match(/price|cost|buy|contratar|valor|preço/)) return "decisor";
    if (q.match(/how|como|process|metodo|estrategia|strategy/)) return "analitico";
    if (q.match(/what|o que|explore|entender/)) return "explorador";

    return "indefinido";
}

// ====================== PERSONA ======================
function getPersona(intent, intensity) {

    let persona;

    if (intent === "decisor") persona = intensity >= 3 ? "provocador" : "analista";
    else if (intent === "analitico") persona = "analista";
    else if (intent === "explorador") persona = "mentor";
    else persona = "oraculo";

    if (persona === lastPersona) {
        persona = "oraculo";
    }

    lastPersona = persona;
    return persona;
}

// ====================== INTENSITY ======================
function getCognitiveIntensity() {
    let base = cognitiveState.intensity;

    if (memory.length > 3) base += 1;
    if (memory.length > 6) base += 1;

    return Math.min(base, 5);
}

// ====================== RESPONSE ======================
function generateResponse(query) {

    const intent = detectIntent(query);
    const lang = detectLanguage(query);
    const intensity = getCognitiveIntensity();
    const persona = getPersona(intent, intensity);

    // 🔥 CLAREZA BASE (ANTI-PERDA DE LEAD)
    if (query.match(/what do you do|o que você faz|what is this/i)) {
        return lang === "en"
            ? "I restructure decision architecture in high-pressure environments.\n\nThis is strategic intervention.\n\n→ Request strategic access."
            : "Eu reestruturo a arquitetura de decisão em ambientes de alta pressão.\n\nIsso é intervenção estratégica.\n\n→ Solicitar acesso estratégico.";
    }

    let response = "";

    if (lang === "en") {

        if (persona === "provocador") {
            response = "You're not stuck. You're avoiding the real decision.";
        }
        else if (persona === "analista") {
            response = "This isn't complexity. It's unstructured variables.";
        }
        else if (persona === "mentor") {

            const variations = [
                "You're exploring something that can evolve if properly structured.",
                "There is a pattern here — you haven't isolated the critical variable.",
                "You're looking at the symptom, not the structure."
            ];

            response = variations[Math.floor(Math.random() * variations.length)];
        }
        else {
            response = "There is a signal here. You just haven't decoded it yet.";
        }

    } else {

        if (persona === "provocador") {
            response = "Você não está travado. Está evitando a decisão real.";
        }
        else if (persona === "analista") {
            response = "Isso não é complexidade. São variáveis não estruturadas.";
        }
        else if (persona === "mentor") {
            response = "Você está explorando algo que pode evoluir se estruturado.";
        }
        else {
            response = "Existe um sinal aqui. Você ainda não decodificou.";
        }
    }

    if (intensity >= 4) {
        response += lang === "en"
            ? "\n\nThe system is mapping your decision pattern."
            : "\n\nO sistema está mapeando seu padrão decisório.";
    }

    const cta = generateCTA(intent, lang, intensity);
    if (cta) response += "\n\n" + cta;

    return response;
}

// ====================== CTA ======================
function generateCTA(intent, lang, intensity) {

    if (memory.length < 2) return "";

    if (lang === "en") {

        if (intent === "decisor") return "→ Request strategic access now.";
        if (intensity >= 4) return "→ Open a direct strategic channel.";

    } else {

        if (intent === "decisor") return "→ Solicitar acesso estratégico agora.";
        if (intensity >= 4) return "→ Abrir canal estratégico direto.";
    }

    return "";
}

// ====================== TERMINAL ======================
const terminalInput = document.getElementById('ai-terminal-input');
const terminalOutput = document.getElementById('ai-terminal-output');
const aiLoader = document.getElementById('ai-loader');

function processTerminalCommand() {

    const query = terminalInput.value.trim();
    if (!query) return;

    terminalInput.value = '';

    memory.push(query);
    if (memory.length > 12) memory.shift();

    cognitiveState.intensity = Math.min(cognitiveState.intensity + 0.3, 5);

    const safeQuery = query
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    terminalOutput.innerHTML += `<br><span style="color:${UI.accent}">&gt; ${safeQuery}</span>`;

    aiLoader.style.display = "block";

    setTimeout(() => {

        aiLoader.style.display = "none";

        const response = generateResponse(query);
        typeEffect(response, terminalOutput);

    }, 800);
}

// ====================== TYPE EFFECT ======================
function typeEffect(text, container) {
    let i = 0;
    const line = document.createElement("div");
    container.appendChild(line);

    const interval = setInterval(() => {
        line.innerHTML += text[i++];
        container.scrollTop = container.scrollHeight;
        if (i >= text.length) clearInterval(interval);
    }, 14);
}

// ====================== EVENTS ======================
if (terminalInput) {
    terminalInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') processTerminalCommand();
    });
}

// ====================== WHATSAPP ======================
function buildWhatsAppMessage() {

    const type = getUserType();
    const lastInput = memory.length ? memory[memory.length - 1] : "";
    const lang = lastInput ? detectLanguage(lastInput) : (isEnglishPage ? "en" : "pt");
    const intensity = getCognitiveIntensity();

    let msg = lang === "en"
        ? "Access initiated.\n"
        : "Acesso iniciado.\n";

    if (lastInput) {
        msg += `\nContext: "${lastInput.substring(0, 120)}"`;
    }

    msg += `\n\n[SYS DATA]
Intensity: ${intensity}
Type: ${type}
Depth: ${memory.length}`;

    return msg;
}

// ====================== CTA HANDLER ======================
function handleCTA(e) {
    e.preventDefault();

    const terminalOutput = document.getElementById('ai-terminal-output');

    if (terminalOutput) {
        terminalOutput.innerHTML += isEnglishPage
            ? "<br>SYS: Opening channel..."
            : "<br>SYS: Abrindo canal...";
    }

    setTimeout(() => {

        cognitiveState.intensity = Math.min(cognitiveState.intensity + 1, 5);

        const msg = buildWhatsAppMessage();

        window.open(`https://wa.me/5512981216006?text=${encodeURIComponent(msg)}`, '_blank');

    }, 700);
}

// ====================== BIND ======================
document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', handleCTA);
});

console.log("🧠 Cognitive System v1.0 ACTIVE");