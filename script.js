// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.8 ======================

// 1. IMPORTAÇÕES E TRATAMENTO DE ERROS DE MÓDULO
import { updateProfile, getUserType } from './js/profile-engine.js';
import { processAI } from './js/ai-orchestrator.js';

// ====================== LOADER & SCROLL RESET (SISTEMA INTEGRADO) ======================
const loaderText = document.getElementById("loader-text");
const sequence = [
    "INITIALIZING SYSTEM...",
    "Mapping Cognitive Layers...",
    "Synchronizing Intelligence...",
    "Access Protocol Ready"
];
let step = 0;

// Reset de Scroll Imediato (Trava o navegador no topo)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

function runLoader() {
    if (loaderText && step < sequence.length) {
        loaderText.textContent = sequence[step++];
        setTimeout(runLoader, 550);
    } else {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
                window.scrollTo(0, 0);
            }, 700);
        }
    }
}

// Dispara o loader apenas no load total para garantir o sincronismo
window.addEventListener("load", () => {
    window.scrollTo(0, 0);
    runLoader();
});

// ====================== CURSOR E PERFORMANCE MOBILE ======================
const isMobile = window.innerWidth < 768;
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

if (!isMobile && dot && ring) {
    document.addEventListener("mousemove", (e) => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}

// ====================== THREE.JS - PARTICLES (PURISTA & SUTIL) ======================
const canvas = document.getElementById("neural-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
camera.position.z = 11;

let particleCount = isMobile ? 800 : 2200;
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 35;
    positions[i + 1] = (Math.random() - 0.5) * 35;
    positions[i + 2] = (Math.random() - 0.5) * 15;
    velocities[i] = (Math.random() - 0.5) * 0.004;
    velocities[i + 1] = (Math.random() - 0.5) * 0.004;
    velocities[i + 2] = (Math.random() - 0.5) * 0.004;
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: isMobile ? 0.035 : 0.03,
    color: 0x00c4ff,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
    depthTest: false
});

const cognitiveParticles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(cognitiveParticles);

// ====================== ANIMAÇÃO FINAL E ÚNICA ======================
let mouseX = 0, mouseY = 0;
if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
}

function animateThree() {
    requestAnimationFrame(animateThree);
    const time = Date.now() * 0.0005;

    const positionsAttr = cognitiveParticles.geometry.attributes.position;
    for (let i = 0; i < particleCount * 3; i += 3) {
        positionsAttr.array[i] += velocities[i];
        positionsAttr.array[i + 1] += velocities[i + 1];

        if (!isMobile) {
            positionsAttr.array[i] += mouseX * 0.0008;
            positionsAttr.array[i + 1] += mouseY * 0.0008;
        }

        if (Math.abs(positionsAttr.array[i]) > 20) velocities[i] *= -1;
        if (Math.abs(positionsAttr.array[i + 1]) > 20) velocities[i + 1] *= -1;
    }
    positionsAttr.needsUpdate = true;
    cognitiveParticles.rotation.y = time * 0.01;
    renderer.render(scene, camera);
}
animateThree();

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ====================== LÓGICA DE NEGÓCIO (PERFIL PSICOLÓGICO) ======================
updateProfile();

function updateDynamicCopy() {
    const el = document.querySelector('.hero-highlight');
    if (!el) return;
    const type = getUserType();
    const messages = {
        "decisor": "Sua urgência sugere necessidade imediata de clareza estratégica.",
        "analitico": "Sua análise profunda dos dados precede sua próxima decisão.",
        "morno": "O primeiro passo para o controle é a percepção estratégica.",
        "frio": "Poucos percebem o que realmente importa agora."
    };
    el.style.opacity = "0";
    setTimeout(() => {
        el.textContent = messages[type] || messages["frio"];
        el.style.opacity = "1";
    }, 450);
}
setInterval(updateDynamicCopy, 5500);

// ====================== INTERFACE DA IA (TERMINAL) ======================
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
    aiLoader.style.display = 'block';

    processAI(input, (response) => {
        aiLoader.style.display = 'none';
        aiOutput.textContent = `SYS-RESPONSE: ${response}`;
        aiOutput.style.transition = 'opacity 0.3s';
        aiOutput.style.opacity = '0';
        setTimeout(() => aiOutput.style.opacity = '1', 200);
    });
}

if (aiInput) {
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAISubmission();
    });
}
document.getElementById('ai-terminal-submit')?.addEventListener('click', handleAISubmission);

// ====================== SMART CTAs (BILINGUAL WHATSAPP) ======================
document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isEn = window.location.pathname.includes('/en/');
        const userType = getUserType();
        const config = {
            EN: { phone: "5512981216006", text: `Hello. I am requesting strategic access via Jannuzzelli System. [Context: ${userType}]` },
            PT: { phone: "5512981216006", text: `Olá. Solicito acesso estratégico via Sistema Jannuzzelli. [Contexto: ${userType}]` }
        };
        const selected = isEn ? config.EN : config.PT;
        window.open(`https://wa.me/${selected.phone}?text=${encodeURIComponent(selected.text)}`, '_blank');
    });
});