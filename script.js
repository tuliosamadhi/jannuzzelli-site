// LOADER SEQUENCIAL
const loaderText = document.querySelector(".loader-text");

const sequence = [
    "INITIALIZING SYSTEM...",
    "Mapping Cognitive Layers...",
    "Synchronizing Intelligence...",
    "Access Protocol Ready"
];

let step = 0;

function runLoader() {
    if (step < sequence.length) {
        loaderText.innerText = sequence[step];
        step++;
        setTimeout(runLoader, 800);
    } else {
        setTimeout(() => {
            document.getElementById("loader").style.opacity = "0";
            setTimeout(() => {
                document.getElementById("loader").style.display = "none";
            }, 600);
        }, 500);
    }
}

window.addEventListener("load", runLoader);

// REVEAL
const reveals = document.querySelectorAll(".reveal");

function reveal() {
    const trigger = window.innerHeight * 0.85;

    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < trigger) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal();

// PARALLAX
window.addEventListener("scroll", () => {
    const scroll = window.scrollY;

    document.querySelector(".bg-monogram").style.transform =
        `translateY(${scroll * 0.2}px)`;

    document.querySelector(".bg-energy").style.transform =
        `translateY(${scroll * 0.1}px)`;
});

// ATIVA PARA USUÁRIOS AVANÇADOS
function unlockAccessLayer() {
    document.getElementById("access-layer").style.display = "flex";
}

// GATILHO
setInterval(() => {
    if (profile.intensity > 40) {
        unlockAccessLayer();
    }
}, 4000);

// CURSOR
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

window.addEventListener("mousemove", e => {
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// MAGNETIC BUTTON
document.querySelectorAll(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
    });
});

// ==========================
// 🧠 INTELIGÊNCIA DE INTERAÇÃO
// ==========================

let engagementScore = 0;

// SCROLL PROFUNDO
window.addEventListener("scroll", () => {
    const scrollPercent =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);

    if (scrollPercent > 0.25) engagementScore += 1;
    if (scrollPercent > 0.5) engagementScore += 2;
    if (scrollPercent > 0.75) engagementScore += 3;
});

// TEMPO NO SITE
setInterval(() => {
    engagementScore += 1;
}, 5000);

// HOVER EM CTA
document.querySelectorAll(".cta").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        engagementScore += 5;
    });
});

// DEBUG (remover depois)
console.log("Engagement ativo");

// ==========================
// 🎯 DECISÃO DINÂMICA
// ==========================

function evaluateUser() {
    if (engagementScore > 15) {
        unlockHighIntent();
    }
}

setInterval(evaluateUser, 4000);

// ==========================
// 🔓 LIBERAÇÃO DE CAMADA
// ==========================

function unlockHighIntent() {
    document.body.classList.add("high-intent");

    const hidden = document.createElement("div");
    hidden.className = "deep-layer";
    hidden.innerText = "Strategic channel available";

    document.body.appendChild(hidden);
}

// PORTAL OCULTO POR TECLA
window.addEventListener("keydown", (e) => {
    if (e.key === "i") {
        window.location.href = "mailto:intelligence@jannuzzelli.pro?subject=Strategic Access";
    }
});

setInterval(() => {
    document.body.style.filter =
        "brightness(" + (0.98 + Math.random() * 0.04) + ")";
}, 3000);

// ==========================
// 🌌 WEBGL SINGULARITY CORE
// ==========================

const canvas = document.getElementById("neural-canvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 5;

// PARTICLES
const particlesCount = 1200;

const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
}

geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x88aaff,
    transparent: true,
    opacity: 0.7
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// MOUSE INTERACTION
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ANIMATE
function animate() {
    requestAnimationFrame(animate);

    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0004;

    particles.rotation.y += mouseX * 0.002;
    particles.rotation.x += mouseY * 0.002;

    renderer.render(scene, camera);
}

animate();

// REAÇÃO À INTENSIDADE
if (window.profile) {
    material.size = 0.02 + profile.intensity * 0.0005;
    material.opacity = 0.5 + profile.intensity * 0.01;
}

// RESIZE
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// ATIVA SOM APÓS INTERAÇÃO
const audio = document.getElementById("ambient-audio");

window.addEventListener("click", () => {
    audio.volume = 0.08;
    audio.play().catch(() => { });
}, { once: true });

// RESPIRAÇÃO DO SISTEMA
const t = Date.now() * 0.001;

particles.scale.x = 1 + Math.sin(t) * 0.02;
particles.scale.y = 1 + Math.sin(t) * 0.02;

const pulse = Math.sin(Date.now() * 0.001);

particles.rotation.z += 0.0005;
particles.scale.set(
    1 + pulse * 0.03,
    1 + pulse * 0.03,
    1
);


// ==========================
// 🧠 CONSCIÊNCIA ADAPTATIVA
// ==========================

// PERFIL DO USUÁRIO
let profile = {
    time: 0,
    scrollDepth: 0,
    interactions: 0,
    intensity: 0
};

// TEMPO
setInterval(() => {
    profile.time += 1;
    calculateIntensity();
}, 1000);

// SCROLL
window.addEventListener("scroll", () => {
    const depth =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);

    profile.scrollDepth = depth;
    calculateIntensity();
});

// INTERAÇÃO
window.addEventListener("mousemove", () => {
    profile.interactions += 0.05;
});

// SALVAR PERFIL
setInterval(() => {
    localStorage.setItem("jannuzzelli_profile", JSON.stringify(profile));
}, 5000);

// CARREGAR
const saved = localStorage.getItem("jannuzzelli_profile");

if (saved) {
    profile = JSON.parse(saved);
}

// SALVA ESTADO
setInterval(() => {
    localStorage.setItem("entity_state", JSON.stringify(entity));
}, 4000);

// CARREGA
const savedEntity = localStorage.getItem("entity_state");

if (savedEntity) {
    Object.assign(entity, JSON.parse(savedEntity));
}

// ==========================
// 🧠 CÁLCULO DE INTENSIDADE
// ==========================

function calculateIntensity() {
    profile.intensity =
        profile.time * 0.3 +
        profile.scrollDepth * 10 +
        profile.interactions;

    adaptSystem();
}

// ==========================
// 🎯 ADAPTAÇÃO DO SISTEMA
// ==========================

function adaptSystem() {

    const i = profile.intensity;

    // NÍVEL 1
    if (i > 5) {
        document.body.classList.add("level-1");
    }

    // NÍVEL 2
    if (i > 15) {
        document.body.classList.add("level-2");
    }

    // NÍVEL 3
    if (i > 30) {
        document.body.classList.add("level-3");
    }

    // NÍVEL 4 (RARE)
    if (i > 60) {
        unlockSingularity();
    }

    // WEBGL REAÇÃO
    if (window.particles) {
        particles.rotation.y += i * 0.00001;
    }
}

// ==========================
// 🔐 SINGULARIDADE FINAL
// ==========================

function unlockSingularity() {

    if (document.body.classList.contains("singularity")) return;

    document.body.classList.add("singularity");

    const msg = document.createElement("div");
    msg.className = "singularity-message";
    msg.innerText = "You are inside the system.";

    document.body.appendChild(msg);
}

window.addEventListener("mousemove", e => {
    document.body.style.setProperty("--x", e.clientX + "px");
    document.body.style.setProperty("--y", e.clientY + "px");
});

const messages = [
    "System observing...",
    "Pattern detected...",
    "Cognitive alignment increasing...",
    "Signal recognized..."
];

function spawnSystemMessage() {

    const msg = document.createElement("div");
    msg.className = "system-msg";

    msg.innerText =
        messages[Math.floor(Math.random() * messages.length)];

    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 4000);
}

// dispara com intensidade
setInterval(() => {
    if (profile.intensity > 20) {
        spawnSystemMessage();
    }
}, 5000);

// ==========================
// 🧠 ENTITY CORE
// ==========================

const entity = {
    awareness: 0,
    interest: 0,
    trust: 0,
    mood: "observing"
};

// ATUALIZA ESTADO
setInterval(() => {
    entity.awareness += profile.time * 0.05;
    entity.interest += profile.interactions * 0.02;

    evaluateEntity();
}, 2000);

// LÓGICA
function evaluateEntity() {

    if (entity.interest > 10) {
        entity.mood = "curious";
    }

    if (entity.interest > 25) {
        entity.mood = "engaged";
    }

    if (profile.intensity > 50) {
        entity.mood = "selecting";
    }

    if (profile.intensity > 80) {
        entity.mood = "accepting";
        grantAccess();
    }
}

const entityVoice = [
    "I am observing your pattern.",
    "Your behavior is being evaluated.",
    "Not everyone reaches this layer.",
    "You are approaching access.",
    "Clarity of intent defines progression."
];

function entitySpeak() {

    if (entity.mood === "observing") return;

    const msg = document.createElement("div");
    msg.className = "entity-voice";

    msg.innerText =
        entityVoice[Math.floor(Math.random() * entityVoice.length)];

    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 5000);
}

setInterval(entitySpeak, 6000);

// MICRO-DELAY NO CURSOR (sensação de observação)
window.addEventListener("mousemove", e => {
    setTimeout(() => {
        document.body.style.setProperty("--x", e.clientX + "px");
        document.body.style.setProperty("--y", e.clientY + "px");
    }, 40);
});

function grantAccess() {

    if (document.body.classList.contains("granted")) return;

    document.body.classList.add("granted");

    const msg = document.createElement("div");
    msg.className = "granted-msg";

    msg.innerText = "Access granted.";

    document.body.appendChild(msg);

    setTimeout(() => {
        window.location.href =
            "mailto:intelligence@jannuzzelli.pro?subject=Accepted";
    }, 4000);
}