// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.3 ======================
// Integração Profunda com Gemini + Fechamento de Negócio

let profile = { time: 0, scrollDepth: 0, interactions: 0, intensity: 0, stage: "awareness" };

const GEMINI_API_KEY = "AIzaSyB12Km76wnrnvxZ3XEoFVx6jpc-v7ITixc"; // ← Sua chave

async function askGemini(prompt) {
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (e) {
        console.warn("Gemini error:", e);
        return null;
    }
}

// ====================== TRACKING AVANÇADO ======================
window.addEventListener("scroll", () => {
    const depth = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    profile.scrollDepth = depth;
    if (depth > 0.4) profile.stage = "consideration";
    if (depth > 0.75) profile.stage = "decision";
    calculateIntensity();
});

document.addEventListener("mousemove", () => { profile.interactions += 0.1; });
document.addEventListener("click", () => { profile.interactions += 2; });

setInterval(() => {
    profile.time += 1;
    calculateIntensity();
}, 1000);

function calculateIntensity() {
    profile.intensity = (profile.time * 0.4) + (profile.scrollDepth * 15) + (profile.interactions * 1.2);
}

// ====================== INTELIGÊNCIA GEMINI ======================

async function triggerDeepInsight() {
    if (profile.intensity < 30) return;

    const prompt = `Usuário está no site de Arquitetura Cognitiva Estratégica de Túlio Jannuzzelli.
Etapa atual: ${profile.stage}
Tempo no site: ${profile.time}s
Profundidade de scroll: ${Math.round(profile.scrollDepth * 100)}%
Interações: ${Math.round(profile.interactions)}
Gere uma frase curta (máximo 18 palavras), poderosa e estratégica sobre reconfiguração cognitiva, no tom místico-tecnológico de alta autoridade.`;

    const insight = await askGemini(prompt);
    if (insight) {
        const target = document.querySelector('.hero-highlight') || document.querySelector('.signature');
        if (target) {
            target.style.transition = "all 1s";
            target.style.opacity = "0";
            setTimeout(() => {
                target.innerHTML = insight;
                target.style.opacity = "1";
            }, 900);
        }
    }
}

// Ativa insights profundos em momentos chave
setTimeout(() => triggerDeepInsight(), 6500);
window.addEventListener('scroll', () => {
    if (profile.intensity > 45) triggerDeepInsight();
});

// ====================== FECHAMENTO DE NEGÓCIO (WhatsApp Inteligente) ======================
async function generateClosingMessage() {
    const prompt = `Usuário demonstrou alta intenção no site de Arquitetura Cognitiva Estratégica.
Tempo: ${profile.time}s | Scroll: ${Math.round(profile.scrollDepth * 100)}% | Intensidade: ${Math.round(profile.intensity)}
Escreva uma mensagem curta, profissional e persuasiva para WhatsApp que o usuário pode enviar diretamente para Túlio Jannuzzelli pedindo uma conversa estratégica. Máximo 3 linhas.`;

    const aiMessage = await askGemini(prompt) || "Olá Túlio, vi seu site e gostaria de conversar sobre arquitetura cognitiva.";

    const finalMessage = `${aiMessage}\n\n[Session Data]\nTempo: ${profile.time}s | Intensidade Cognitiva: ${Math.round(profile.intensity)}`;

    return encodeURIComponent(finalMessage);
}

// Atualiza CTA com mensagem inteligente
document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        if (profile.intensity < 25) return; // ainda não tem intenção suficiente

        e.preventDefault();
        const message = await generateClosingMessage();
        const whatsappUrl = `https://wa.me/5512981216006?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
});

// ====================== INICIALIZAÇÃO ======================
console.log("%c🧠 Cognitive System v0.3 — Deep AI Integration Activated", "color:#00f0ff; font-size:12px; letter-spacing:1px;");

revealOnScroll(); // função que já existia no script anterior+