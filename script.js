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

// ====================== RESPONSE ENGINE ======================
function generateResponse(query, userType) {

    const mutation = generateHexagram();

    const base = {
        decisor: [
            "Você já cruzou o ponto de decisão.",
            "A estrutura atual não sustenta o próximo movimento.",
            "O custo de não agir já está ativo."
        ],
        analitico: [
            "Você já tem dados suficientes.",
            "O excesso de análise mascara o desalinhamento.",
            "A estrutura não acompanha sua capacidade cognitiva."
        ],
        morno: [
            "Existe um padrão que você ainda não nomeou.",
            "Você percebe, mas não estruturou."
        ],
        frio: [
            "Há algo aqui que você ainda não está vendo.",
            "O sistema ainda está sendo observado."
        ]
    };

    let response = base[userType][Math.floor(Math.random() * base[userType].length)];

    if (memory.length > 2) {
        response += " Um padrão recorrente foi detectado.";
    }

    if (mutation >= 3) {
        response += " Isso indica transformação estrutural.";
    }

    if (cognitiveState.depth > 2) {
        response += " Isso é arquitetura de identidade.";
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

    terminalOutput.innerHTML += `<br>&gt; ${query}`;

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

// ====================== WHATSAPP ======================
function handleCTA(e) {
    e.preventDefault();
    const type = getUserType();

    let msg = "Quero entender melhor.";
    if (type === "decisor") msg = "Quero começar agora.";
    if (type === "analitico") msg = "Quero aplicar no meu caso.";

    window.open(`https://wa.me/5512981216006?text=${encodeURIComponent(msg)}`, '_blank');
}

document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', handleCTA);
});

console.log("🧠 Cognitive System FINAL ACTIVE");