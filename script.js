// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.7 - COM TERMINAL IA ======================

// Importações
import { updateProfile, getUserType } from './js/profile-engine.js';

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

// ====================== COPY DINÂMICO ======================
function updateDynamicCopy() {
    const el = document.querySelector('.hero-highlight');
    if (!el) return;
    const type = getUserType();
    const messages = {
        "decisor": "Você já sabe o que precisa fazer.",
        "analitico": "Tudo já foi analisado. Falta apenas sua decisão.",
        "morno": "Você está perto de ver o que poucos enxergam.",
        "frio": "Poucos percebem o que realmente importa agora."
    };
    el.style.transition = "opacity 0.9s";
    el.style.opacity = "0";
    setTimeout(() => {
        el.textContent = messages[type] || messages["frio"];
        el.style.opacity = "1";
    }, 700);
}
setInterval(updateDynamicCopy, 5500);

// ====================== TERMINAL IA (Restaurado) ======================
const aiInput = document.getElementById('ai-terminal-input');
const aiOutput = document.getElementById('ai-terminal-output');
const aiLoader = document.getElementById('ai-loader');

const isEnglishPage = window.location.pathname.includes('/en/');
const initialMsg = isEnglishPage
    ? "SYS: Awaiting strategic input... Try 'ARAM', 'Context' or 'Strategy'."
    : "SYS: Aguardando entrada cognitiva... Tente 'ARAM', 'Contexto' ou 'Estratégia'.";

if (aiOutput) aiOutput.textContent = initialMsg;

function handleAISubmission() {
    const input = aiInput.value.trim();
    if (!input) return;

    aiInput.value = '';
    aiOutput.textContent = `SYS-ANALYSIS: "${input}" [PENDING]...`;
    if (aiLoader) aiLoader.style.display = 'block';

    // Simulação de IA (pode ser substituída por chamada real depois)
    setTimeout(() => {
        if (aiLoader) aiLoader.style.display = 'none';
        aiOutput.textContent = `SYS-RESPONSE: Processando padrões cognitivos... Recomendo uma conversa estratégica.`;
    }, 1400);
}

if (aiInput) {
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAISubmission();
    });
}
if (document.getElementById('ai-terminal-submit')) {
    document.getElementById('ai-terminal-submit').addEventListener('click', handleAISubmission);
}

// ====================== WHATSAPP INTELIGENTE ======================
function handleCTA(e) {
    e.preventDefault();
    const type = getUserType();
    let msg = "Quero entender melhor o que você faz.";
    if (type === "decisor") msg = "Quero começar agora. Me mostra o caminho direto.";
    else if (type === "analitico") msg = "Analisei seu método. Quero entender como aplicar no meu caso.";
    const url = `https://wa.me/5512981216006?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', handleCTA);
});

// ====================== INIT ======================
console.log("%c🧠 Cognitive System v0.7 - Terminal IA Restaurado + Partículas Avançadas", "color:#00f0ff; font-size:12px");
revealOnScroll();