// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.9.2 - FULL MULTILINGUAL ======================

// Importações
import { updateProfile, getUserType } from './js/profile-engine.js';

// 1. DETECÇÃO DE IDIOMA ÚNICA
const isEnglishPage = window.location.pathname.includes('/en/') || document.documentElement.lang === 'en';

// ====================== COGNITIVE MEMORY ENGINE ======================
let memory = [];
let cognitiveState = {
    intensity: 1,
    depth: 1
};

// ====================== LOADER ======================
const loaderText = document.getElementById("loader-text");

const sequencePT = [
    "INICIALIZANDO SISTEMA...",
    "Mapeando Camadas Cognitivas...",
    "Sincronizando Inteligência...",
    "Calibrando Percepção Estratégica...",
    "Protocolo de Acesso Pronto"
];

const sequenceEN = [
    "INITIALIZING SYSTEM...",
    "Mapping Cognitive Layers...",
    "Synchronizing Intelligence...",
    "Calibrating Strategic Perception...",
    "Access Protocol Ready"
];

const sequence = isEnglishPage ? sequenceEN : sequencePT;
let step = 0;

function runLoader() {
    if (loaderText && step < sequence.length) {
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

// ====================== THREE.JS ======================
const canvas = document.getElementById("neural-canvas");

if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 10;

    const particleCount = window.innerWidth < 768 ? 1400 : 3200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 22;
        positions[i + 1] = (Math.random() - 0.5) * 22;
        positions[i + 2] = (Math.random() - 0.5) * 18;

        colors[i] = 0.3 + Math.random() * 0.7;
        colors[i + 1] = 0.8 + Math.random() * 0.2;
        colors[i + 2] = 1.0;

        sizes[i / 3] = Math.random() * 0.085 + 0.035;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        size: 0.07,
        vertexColors: true,
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
        depthTest: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.001;
        const pos = particles.geometry.attributes.position;

        for (let i = 0; i < particleCount * 3; i += 3) {
            pos.array[i + 1] += Math.sin(time + i) * 0.003 * cognitiveState.intensity;
        }

        pos.needsUpdate = true;

        particles.rotation.y = time * 0.03 + mouseX * 0.35 * cognitiveState.intensity;
        particles.rotation.x = time * 0.015 + mouseY * 0.3;

        particles.scale.setScalar(1 + Math.sin(time * 2.2) * 0.04);

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ====================== PERFIL ======================
updateProfile();

// ====================== COPY DINÂMICO ======================
function updateDynamicCopy() {
    const el = document.querySelector('.hero-highlight');
    if (!el) return;

    const type = getUserType();

    const pt = {
        decisor: "Você já sabe o que precisa fazer.",
        analitico: "Tudo já foi analisado. Falta apenas sua decisão.",
        morno: "Você está perto de ver o que poucos enxergam.",
        frio: "Poucos percebem o que realmente importa agora."
    };

    const en = {
        decisor: "You already know what needs to be done.",
        analitico: "Everything has been analyzed. Only your decision is missing.",
        morno: "You are close to seeing what few perceive.",
        frio: "Few perceive what really matters now."
    };

    const dict = isEnglishPage ? en : pt;

    el.style.opacity = "0";
    setTimeout(() => {
        el.textContent = dict[type] || dict.frio;
        el.style.opacity = "1";
    }, 700);
}

setInterval(updateDynamicCopy, 5500);

// ====================== I-CHING ======================
function generateHexagram() {
    let mutation = 0;
    for (let i = 0; i < 6; i++) {
        if (Math.random() < 0.5) mutation++;
    }
    return mutation;
}

// ====================== INTENT ENGINE ======================
function detectIntent(query) {
    const q = query.toLowerCase();

    if (q.match(/price|cost|buy|contratar|valor|preço/)) return "decisor";
    if (q.match(/how|como|process|metodo|estrategia|strategy/)) return "analitico";
    if (q.match(/what|o que|explore|entender/)) return "explorador";

    return "indefinido";
}

// ====================== LANGUAGE ENGINE ======================
function detectLanguage(query) {
    const hasEN = query.match(/\b(the|is|are|how|what|why)\b/i);
    const hasPT = query.match(/\b(o|a|como|por que|qual)\b/i);

    if (hasEN && !hasPT) return "en";
    if (hasPT && !hasEN) return "pt";

    return isEnglishPage ? "en" : "pt";
}

// ====================== PERSONA ENGINE ======================
function getPersona(intent, intensity) {
    if (intent === "decisor") return intensity >= 3 ? "provocador" : "analista";
    if (intent === "analitico") return "analista";
    if (intent === "explorador") return "mentor";
    return "oraculo";
}

// ====================== CASE ENGINE ======================
function generateCase(lang) {

    const casesPT = [
        "Em um projeto de alta complexidade no setor energético, uma decisão de CAPEX superior a 40M ficou travada até reestruturarmos o modelo de risco.",
        "Em um ambiente de inovação com múltiplas variáveis, o problema não era tecnologia, mas desalinhamento cognitivo na tomada de decisão.",
        "Em um contexto de IA aplicada, o gargalo não era algoritmo, mas a ausência de um modelo estratégico de priorização."
    ];

    const casesEN = [
        "In a high-complexity energy project, a $40M CAPEX decision stalled until we restructured the risk model.",
        "In an innovation environment, the issue wasn't technology, but cognitive misalignment in decision-making.",
        "In applied AI, the bottleneck wasn't the algorithm, but the absence of a strategic prioritization model."
    ];

    const pool = lang === "en" ? casesEN : casesPT;
    return pool[Math.floor(Math.random() * pool.length)];
}

// ====================== CTA ENGINE ======================
function generateCTA(intent, lang, intensity) {

    if (memory.length < 3) return "";

    if (lang === "en") {

        if (intent === "decisor") return "→ Request strategic access.";
        if (intent === "analitico") return "→ See this applied to your context.";

        return "→ Continue this exploration.";

    } else {

        if (intent === "decisor") return "→ Solicitar acesso estratégico.";
        if (intent === "analitico") return "→ Ver aplicação no seu contexto.";

        return "→ Aprofundar essa exploração.";
    }
}

// ====================== INTENSITY ======================
function getCognitiveIntensity() {
    let base = cognitiveState.intensity;

    if (memory.length > 3) base += 1;
    if (memory.length > 6) base += 1;

    return Math.min(base, 5);
}

// ====================== RESPONSE ENGINE ======================
function generateResponse(query, userType) {

    const intent = detectIntent(query);
    const lang = detectLanguage(query);
    const intensity = getCognitiveIntensity();
    const persona = getPersona(intent, intensity);

    let response = "";

    // ====================== CORE RESPONSE ======================

    if (lang === "en") {

        if (persona === "provocador") {
            response = "You're not stuck. You're avoiding the real decision.";
        }

        else if (persona === "analista") {
            response = "What you're describing is not complexity. It's unstructured variables.";
        }

        if (persona === "mentor") {

            const variations = [
                "Você está explorando algo que pode evoluir se bem estruturado.",
                "O que você trouxe ainda está na superfície do problema.",
                "Existe um padrão aqui — mas você ainda não isolou a variável crítica.",
                "Você está olhando para o sintoma, não para a estrutura.",
                "Isso só começa a fazer sentido quando você muda o nível de análise."
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
            response = "O que você descreve não é complexidade. São variáveis não estruturadas.";
        }

        else if (persona === "mentor") {
            response = "Você está explorando algo que pode evoluir se bem estruturado.";
        }

        else {
            response = "Existe um sinal aqui. Você ainda não decodificou.";
        }

    }

    // ====================== CAMADA ESTRATÉGICA ======================

    if (intensity >= 3) {
        response += "\n\n" + generateCase(lang);
    }

    // ====================== CAMADA PROFUNDA ======================

    if (intensity >= 4) {
        response += lang === "en"
            ? "\n\nThe system is already mapping your decision pattern."
            : "\n\nO sistema já está mapeando seu padrão decisório.";
    }

    // ====================== CTA ======================

    const cta = generateCTA(intent, lang, intensity);
    if (cta) {
        response += "\n\n" + cta;
    }

    return response;
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
    }, 16);
}

// ====================== TERMINAL ======================
const terminalInput = document.getElementById('ai-terminal-input');
const terminalOutput = document.getElementById('ai-terminal-output');
const terminalSubmit = document.getElementById('ai-terminal-submit');
const aiLoader = document.getElementById('ai-loader');

if (terminalOutput) {
    terminalOutput.textContent = isEnglishPage
        ? "SYS: Awaiting input..."
        : "SYS: Aguardando entrada...";
}

function processTerminalCommand() {
    const query = terminalInput.value.trim();
    if (!query) return;

    terminalInput.value = '';

    memory.push(query);
    if (memory.length > 12) memory.shift();

    cognitiveState.intensity += 0.2;
    cognitiveState.intensity = Math.min(cognitiveState.intensity, 3);
    cognitiveState.depth += 0.1;

    const safeQuery = query
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    terminalOutput.innerHTML += `<br>&gt; ${safeQuery}`;

    const userType = getUserType();

    setTimeout(() => {
        const response = generateResponse(query, userType);
        typeEffect(response, terminalOutput);
    }, 900);
}

if (terminalInput) {
    terminalInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') processTerminalCommand();
    });
}

if (terminalSubmit) {
    terminalSubmit.addEventListener('click', processTerminalCommand);
}

// ====================== WHATSAPP ELITE ======================
function buildWhatsAppMessage() {

    const type = getUserType();
    const lastInput = memory.length ? memory[memory.length - 1] : "";
    const lang = lastInput ? detectLanguage(lastInput) : (isEnglishPage ? "en" : "pt");
    const intensity = getCognitiveIntensity();

    // ====================== BASE ======================

    let msg = "";

    if (lang === "en") {

        msg += "Access initiated.\n\n";
        msg += "I went through the cognitive interface";

        if (intensity >= 3) {
            msg += " and identified consistent patterns";
        }

        msg += ".\n";

        if (type === "decisor") {
            msg += "I'm ready to move forward.\n";
        } else if (type === "analitico") {
            msg += "I want to validate this in my context.\n";
        } else {
            msg += "I want to explore the next layer.\n";
        }

        if (lastInput) {
            msg += `\nStrategic context detected: "${lastInput.substring(0, 120)}"`;
        }

        if (intensity >= 4) {
            msg += "\nPriority level: High.";
        }

        msg += "\n\n— Cognitive Interface Protocol";

    } else {

        msg += "Acesso iniciado.\n\n";
        msg += "Passei pela interface cognitiva";

        if (intensity >= 3) {
            msg += " e identifiquei padrões consistentes";
        }

        msg += ".\n";

        if (type === "decisor") {
            msg += "Estou pronto para avançar.\n";
        } else if (type === "analitico") {
            msg += "Quero validar isso no meu contexto.\n";
        } else {
            msg += "Quero explorar a próxima camada.\n";
        }

        if (lastInput) {
            msg += `\nContexto estratégico detectado: "${lastInput.substring(0, 120)}"`;
        }

        if (intensity >= 4) {
            msg += "\nNível de prioridade: Alto.";
        }

        msg += "\n\n— Protocolo de Interface Cognitiva";
    }

    return msg;
}

// ====================== HANDLER ======================
function handleCTA(e) {
    e.preventDefault();

    // Micro-delay para simular sistema
    const loaderMsg = isEnglishPage
        ? "SYS: Opening restricted channel..."
        : "SYS: Abrindo canal restrito...";

    const terminalOutput = document.getElementById('ai-terminal-output');

    if (terminalOutput) {
        terminalOutput.innerHTML += `<br>${loaderMsg}`;
        terminalOutput.innerHTML += isEnglishPage
            ? "<br>SYS: Validating access..."
            : "<br>SYS: Validando acesso...";

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    setTimeout(() => {

        // 🔥 UPGRADE COGNITIVO
        cognitiveState.intensity += 1;
        cognitiveState.intensity = Math.min(cognitiveState.intensity, 5);

        const msg = buildWhatsAppMessage();

        window.open(`https://wa.me/5512981216006?text=${encodeURIComponent(msg)}`, '_blank');

    }, 900);

}

// ====================== BIND GLOBAL ======================
document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', handleCTA);
});

console.log("🧠 Cognitive System FINAL ACTIVE");