// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.8 ======================

// 1. IMPORTAÇÕES E TRATAMENTO DE ERROS DE MÓDULO
import { updateProfile, getUserType } from './js/profile-engine.js';

// Carrega o orquestrador de IA local (não trava mais o site se houver falha)
import { processAI } from './js/ai-orchestrator.js';

// ====================== LOADER (À PROVA DE FALHAS) ======================
const loaderText = document.getElementById("loader-text");
const sequence = [
    "INITIALIZING SYSTEM...",
    "Mapping Cognitive Layers...",
    "Synchronizing Intelligence...",
    "Access Protocol Ready"
];
let step = 0;

function runLoader() {
    if (loaderText && step < sequence.length) {
        loaderText.textContent = sequence[step++];
        setTimeout(runLoader, 550);
    } else {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 700);
        }
    }
}
window.addEventListener("DOMContentLoaded", runLoader);

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

// ====================== THREE.JS - PARTICLES (OTIMIZADO & SUTIL) ======================
const canvas = document.getElementById("neural-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Reduzido para sutilizar
camera.position.z = 11; // Mais longe para espalhar as partículas

// Configuração dinâmica de partículas - MAIS SUTIL
const particleCount = isMobile ? 800 : 2200; // Reduzido

const coreGeometry = new THREE.SphereGeometry(1.3, 32, 32);
const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.18, // Sutilizado
    blending: THREE.AdditiveBlending
});
const singularityCore = new THREE.Mesh(coreGeometry, coreMaterial);
scene.add(singularityCore);

const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 28; // Mais espalhado
    positions[i + 1] = (Math.random() - 0.5) * 28;
    positions[i + 2] = (Math.random() - 0.5) * 12; // Menos profundidade

    velocities[i] = (Math.random() - 0.5) * 0.005; // Mais lento
    velocities[i + 1] = (Math.random() - 0.5) * 0.005;
    velocities[i + 2] = (Math.random() - 0.5) * 0.005;
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: isMobile ? 0.04 : 0.035, // MUITO MENORES E QUADRADOS
    color: 0x00c4ff,
    transparent: true,
    opacity: 0.25, // BEM MAIS SUTIL
    blending: THREE.AdditiveBlending,
    depthTest: false
});

const cognitiveParticles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(cognitiveParticles);

// ====================== ANIMAÇÃO E INTERAÇÃO ======================
let mouseX = 0, mouseY = 0;
if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
}

function animateThree() {
    requestAnimationFrame(animateThree);
    const time = Date.now() * 0.0008; // Mais lento

    singularityCore.rotation.y = time * 0.08;
    singularityCore.scale.setScalar(1 + Math.sin(time * 1.1) * 0.08); // Pulsação suave

    const positionsAttr = cognitiveParticles.geometry.attributes.position;
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Velocidade base suave
        positionsAttr.array[i] += velocities[i];
        positionsAttr.array[i + 1] += velocities[i + 1];

        // Reação ao mouse - EXTREMAMENTE SUAVE (Sutilizado)
        if (!isMobile) {
            positionsAttr.array[i] += mouseX * 0.001; // Reduzido de 0.005 para 0.001
            positionsAttr.array[i + 1] += mouseY * 0.001;
        }

        // Mantém as partículas flutuando suavemente de volta
        if (positionsAttr.array[i] > 18 || positionsAttr.array[i] < -18) velocities[i] *= -1;
        if (positionsAttr.array[i + 1] > 18 || positionsAttr.array[i + 1] < -18) velocities[i + 1] *= -1;
    }
    positionsAttr.needsUpdate = true;
    cognitiveParticles.rotation.y = time * 0.015;

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

function handleAISubmission() {
    const input = aiInput.value.trim();
    if (!input) return;

    // UI: Reseta terminal e mostra loader
    aiInput.value = '';
    aiOutput.textContent = `SYS-ANALYSIS: "${input}" [PENDING]...`;
    aiLoader.style.display = 'block';

    // Chama o orquestrador de IA
    processAI(input, (response) => {
        // UI: Oculta loader e atualiza output
        aiLoader.style.display = 'none';
        aiOutput.textContent = `SYS-RESPONSE: ${response}`;

        // Pequena animação de "escrevendo"
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

// CTAs
document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const msg = encodeURIComponent(`Iniciando protocolo estratégico. Contexto detectado: ${getUserType()}`);
        window.open(`https://wa.me/5512981216006?text=${msg}`, '_blank');
    });
});

console.log("%c🧠 Jannuzzelli System v0.8 Online", "color:#00f0ff; font-weight:bold;");