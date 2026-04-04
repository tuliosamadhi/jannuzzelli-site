// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.9.2 - FULL MULTILINGUAL ======================

// Importações
import { updateProfile, getUserType } from './js/profile-engine.js';

// 1. DETECÇÃO DE IDIOMA ÚNICA (Global para o script)
const isEnglishPage = window.location.pathname.includes('/en/') || document.documentElement.lang === 'en';

// ====================== LOADER BILÍNGUE ======================
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

// ====================== THREE.JS - NANO-PARTÍCULAS AVANÇADAS ======================
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

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.07,
        vertexColors: true,
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
        depthTest: false
    });

    const cognitiveParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(cognitiveParticles);

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animateThree() {
        requestAnimationFrame(animateThree);
        const time = Date.now() * 0.001;

        const positionsAttr = cognitiveParticles.geometry.attributes.position;
        for (let i = 0; i < particleCount * 3; i += 3) {
            positionsAttr.array[i + 1] += Math.sin(time + i) * 0.003;
        }
        positionsAttr.needsUpdate = true;

        cognitiveParticles.rotation.y = time * 0.03 + mouseX * 0.35;
        cognitiveParticles.rotation.x = time * 0.015 + mouseY * 0.3;

        cognitiveParticles.scale.setScalar(1 + Math.sin(time * 2.2) * 0.04);

        renderer.render(scene, camera);
    }
    animateThree();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ====================== PERFIL PSICOLÓGICO ======================
updateProfile();

// ====================== COPY DINÂMICO (CORRIGIDO PARA BILÍNGUE) ======================
function updateDynamicCopy() {
    const el = document.querySelector('.hero-highlight');
    if (!el) return;

    const type = getUserType();

    // Dicionário de mensagens por idioma
    const messagesPT = {
        "decisor": "Você já sabe o que precisa fazer.",
        "analitico": "Tudo já foi analisado. Falta apenas sua decisão.",
        "morno": "Você está perto de ver o que poucos enxergam.",
        "frio": "Poucos percebem o que realmente importa agora."
    };

    const messagesEN = {
        "decisor": "You already know what needs to be done.",
        "analitico": "Everything has been analyzed. Only your decision is missing.",
        "morno": "You are close to seeing what few perceive.",
        "frio": "Few perceive what really matters now."
    };

    const activeMessages = isEnglishPage ? messagesEN : messagesPT;

    el.style.transition = "opacity 0.9s";
    el.style.opacity = "0";
    setTimeout(() => {
        el.textContent = activeMessages[type] || activeMessages["frio"];
        el.style.opacity = "1";
    }, 700);
}
setInterval(updateDynamicCopy, 5500);

// ====================== TERMINAL IA COM I-CHING EMBUTIDO (VERSÃO PARA TESTE) ======================
const terminalInput = document.getElementById('ai-terminal-input');
const terminalOutput = document.getElementById('ai-terminal-output');
const terminalSubmit = document.getElementById('ai-terminal-submit');
const aiLoader = document.getElementById('ai-loader');

const initialMsg = isEnglishPage
    ? "SYS: Awaiting strategic input... Try 'ARAM', 'Context', 'Decision', 'Price' or 'Strategy'."
    : "SYS: Aguardando entrada cognitiva... Tente 'ARAM', 'Contexto', 'Decisão', 'Preço' ou 'Estratégia'.";

if (terminalOutput) terminalOutput.textContent = initialMsg;

// IchingEngine embutido (sem arquivo separado)
const iching = {
    castHexagram() {
        return Array.from({ length: 6 }, () => Math.floor(Math.random() * 4) + 6);
    },
    getHexagramData(lines) {
        const intensity = lines.filter(l => l === 6 || l === 9).length;
        return { intensity };
    },
    generateCognitiveResponse(hexData, userType) {
        const hasStrongMutation = hexData.intensity >= 3;

        if (userType === "decisor") {
            return isEnglishPage
                ? "The pattern indicates the strategic decision point has already been surpassed. Maintaining current governance architecture exposes the organization to significant institutional risks. A fundamental reconfiguration of executive decision frameworks is now required."
                : "O padrão indica que o ponto de decisão estratégica já foi ultrapassado. Manter a arquitetura atual de governança expõe a organização a riscos institucionais significativos. É necessária uma reconfiguração fundamental dos frameworks executivos de decisão.";
        }
        if (userType === "analitico") {
            return isEnglishPage
                ? "The misalignment is not in the data, but in the cognitive architecture that organizes governance and execution. Consolidation of institutional structures is required before any digital transformation."
                : "O desalinhamento não está nos dados, mas na arquitetura cognitiva que organiza governança e execução. É necessária a consolidação de estruturas institucionais antes de qualquer transformação digital.";
        }
        return isEnglishPage
            ? "The system has detected structural hesitation at the executive level. Before advancing in digital integration or restructuring, C-Level decision frameworks and institutional governance must be redefined."
            : "O sistema detectou hesitação estrutural no nível executivo. Antes de avançar em integração digital ou reestruturação, é essencial redefinir os frameworks de decisão de C-Level e a governança institucional.";
    }
};

function processTerminalCommand() {
    const query = terminalInput.value.trim();
    if (!query) return;

    terminalInput.value = '';
    if (aiLoader) aiLoader.style.display = 'block';
    if (terminalSubmit) terminalSubmit.style.opacity = '0.5';

    terminalOutput.innerHTML += `<br><span class="user-msg">&gt; ${query}</span>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;

    const userType = getUserType();

    setTimeout(() => {
        let response = "";

        // Ativação forte para teste (80% de chance)
        const useIching = Math.random() < 0.80;

        console.log(`🔥 I-Ching ativado: ${useIching} | Tipo: ${userType}`);   // Debug

        if (useIching) {
            const lines = iching.castHexagram();
            const hexData = iching.getHexagramData(lines);
            response = iching.generateCognitiveResponse(hexData, userType);
        }
        else {
            // Respostas normais (suas antigas)
            const lowerQuery = query.toLowerCase();
            if (lowerQuery.includes('aram')) {
                response = isEnglishPage ? "ARAM METHOD: Portable architecture system for decision-making under extreme pressure. Status: ACTIVE." : "MÉTODO ARAM: Sistema de arquitetura portátil para decisão sob pressão extrema. Status: ATIVO.";
            } else if (lowerQuery.includes('preço') || lowerQuery.includes('price') || lowerQuery.includes('valor')) {
                response = isEnglishPage ? "VALUE: Investment is proportional to the complexity of the system to be restructured." : "VALOR: O investimento é proporcional à complexidade do sistema a ser reestruturado.";
            } else {
                const base = {
                    "decisor": isEnglishPage ? "Your urgency suggests the decision point has already been reached." : "Sua urgência indica que o ponto de decisão já foi alcançado.",
                    "analitico": isEnglishPage ? "The bottleneck is not in the data, but in the architecture." : "O gargalo não está nos dados, mas na arquitetura.",
                    "morno": isEnglishPage ? "You are on the threshold of structural clarity." : "Você está no limiar da clareza estrutural.",
                    "frio": isEnglishPage ? "The system has detected cognitive hesitation." : "O sistema detectou hesitação cognitiva."
                };
                response = base[userType] || base["frio"];
            }
        }

        terminalOutput.innerHTML += `<br><span class="sys-msg">SYS-RESPONSE:</span> ${response}`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        if (aiLoader) aiLoader.style.display = 'none';
        if (terminalSubmit) terminalSubmit.style.opacity = '1';
        terminalInput.focus();

    }, 1400);
}

// Eventos
if (terminalInput) terminalInput.addEventListener('keypress', e => { if (e.key === 'Enter') processTerminalCommand(); });
if (terminalSubmit) terminalSubmit.addEventListener('click', processTerminalCommand);

// ====================== WHATSAPP INTELIGENTE ======================
function handleCTA(e) {
    e.preventDefault();
    const type = getUserType();

    let msgPT = "Quero entender melhor o que você faz.";
    if (type === "decisor") msgPT = "Quero começar agora. Me mostra o caminho direto.";
    else if (type === "analitico") msgPT = "Analisei seu método. Quero entender como aplicar no meu caso.";

    let msgEN = "I want to better understand what you do.";
    if (type === "decisor") msgEN = "I want to start now. Show me the direct path.";
    else if (type === "analitico") msgEN = "I analyzed your method. I want to understand how to apply it to my case.";

    const finalMsg = isEnglishPage ? msgEN : msgPT;
    const url = `https://wa.me/5512981216006?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, '_blank');
}

document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', handleCTA);
});

console.log("%c🧠 Cognitive System v0.9.2 - Full Multilingual Mode Active", "color:#00f0ff; font-size:12px");

// Dentro do setTimeout, após calcular 'response':

terminalOutput.innerHTML += `<br><span class="sys-msg">SYS-RESPONSE:</span> ${response}`;