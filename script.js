// ====================== JANNUZZELLI COGNITIVE SYSTEM v2.0 ======================
// Terminal inteligente sem IA — base de conhecimento estruturada, bilíngue

import { updateProfile, getUserType } from './js/profile-engine.js';

// ====================== LANGUAGE ======================
const isEnglishPage = window.location.pathname.includes('/en/') || document.documentElement.lang === 'en';

// ====================== MEMORY ======================
let memory = [];
let lastTopics = [];
let interactionCount = 0;

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
    const q = query.toLowerCase();

    // English indicators
    const enWords = ['the', 'is', 'are', 'how', 'what', 'why', 'who', 'when', 'where', 'do', 'does', 'can', 'you', 'your', 'work', 'this', 'that', 'with', 'and', 'for'];
    const ptWords = ['o', 'a', 'como', 'por', 'qual', 'você', 'seu', 'sua', 'que', 'de', 'da', 'do', 'em', 'para', 'com', 'não', 'mas', 'isso', 'esse', 'essa', 'é'];

    const enMatches = enWords.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(q)).length;
    const ptMatches = ptWords.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(q)).length;

    if (enMatches > ptMatches) return 'en';
    if (ptMatches > enMatches) return 'pt';

    return isEnglishPage ? 'en' : 'pt';
}

// ====================== KNOWLEDGE BASE — BILINGUE ======================
const KB = {
    // ARAM Method
    aram: {
        pt: [
            "O Método ARAM é um framework proprietário de arquitetura cognitiva estratégica, desenvolvido em 2020. Não é consultoria — é intervenção na estrutura onde as decisões são formadas.\n\n→ Qual aspecto do ARAM te interessa mais: o processo, os resultados ou os contextos de aplicação?",
            "ARAM: Análise-Reconfiguração-Arquitetura-Movimento. Um framework de quatro fases que identifica os padrões cognitivos que travam sistemas de decisão em ambientes de alta complexidade.\n\n→ Você pode descrever qual tipo de travamento enfrenta agora?",
            "O ARAM foi construído para ambientes onde os modelos convencionais de gestão são insuficientes — onde a causa real dos travamentos não é visível de dentro do sistema.\n\n→ Isso ressoa com algo no seu ambiente atual?"
        ],
        en: [
            "The ARAM Method is a proprietary framework for cognitive strategic architecture, developed in 2020. It's not consulting — it's intervention at the level where decisions are formed.\n\n→ Which aspect of ARAM interests you most: the process, the outcomes, or the application contexts?",
            "ARAM: Analysis-Reconfiguration-Architecture-Movement. A four-phase framework that identifies cognitive patterns blocking decision systems in high-complexity environments.\n\n→ Can you describe the type of blockage you're currently facing?",
            "ARAM was built for environments where conventional management models are insufficient — where the real causes of dysfunction are not visible from inside the system.\n\n→ Does this resonate with something in your current environment?"
        ]
    },

    // Strategy / Estratégia
    strategy: {
        pt: [
            "Arquitetura estratégica não é sobre fazer mais planos — é sobre identificar por que os planos existentes não estão sendo executados. A variável de controle raramente está onde parece.\n\n→ Qual decisão estratégica está travada no seu contexto agora?",
            "O problema não é falta de estratégia. É excesso de complexidade não estruturada operando no mesmo espaço de decisão. Isso cria ruído que anula capacidade de execução.\n\n→ Você consegue identificar onde o ruído começa no seu sistema?",
            "Estratégia sem arquitetura cognitiva é velocidade sem direção. O que separa ambientes que avançam dos que ficam em plateau é a qualidade da estrutura de decisão — não a qualidade das ideias.\n\n→ Como funciona o seu processo atual de priorização estratégica?"
        ],
        en: [
            "Strategic architecture isn't about making more plans — it's about identifying why existing plans are not being executed. The control variable is rarely where it appears to be.\n\n→ What strategic decision is currently stuck in your context?",
            "The problem isn't lack of strategy. It's unstructured complexity operating within the same decision space. This creates noise that cancels execution capacity.\n\n→ Can you identify where the noise starts in your system?",
            "Strategy without cognitive architecture is speed without direction. What separates advancing environments from plateauing ones is the quality of decision structure — not the quality of ideas.\n\n→ How does your current strategic prioritization process work?"
        ]
    },

    // Decision / Decisão
    decision: {
        pt: [
            "Decisões não travam por falta de dados. Travam por arquiteturas cognitivas incompatíveis operando o mesmo problema — ou por pressão sistêmica que anula a capacidade de agir sobre o que já é sabido.\n\n→ Sua decisão travada precisa de mais informação ou de reconfiguração do ambiente que decide?",
            "Existe uma diferença entre decisão adiada e decisão bloqueada. Decisão adiada pode ser resolvida com clareza e urgência. Decisão bloqueada requer intervenção na estrutura.\n\n→ O que acontece quando você tenta avançar a decisão?",
            "O momento mais custoso em qualquer sistema de decisão é quando a janela de intervenção está aberta mas não é reconhecida como tal. Cada semana de inação amplifica o custo.\n\n→ Há quanto tempo esse bloqueio existe?"
        ],
        en: [
            "Decisions don't stall from lack of data. They stall from incompatible cognitive architectures operating on the same problem — or from systemic pressure that cancels the ability to act on what's already known.\n\n→ Does your stuck decision need more information or a reconfiguration of the decision environment?",
            "There is a difference between a postponed decision and a blocked decision. Postponed can be resolved with clarity and urgency. Blocked requires structural intervention.\n\n→ What happens when you try to advance the decision?",
            "The most costly moment in any decision system is when the intervention window is open but not recognized as such. Each week of inaction amplifies the cost.\n\n→ How long has this blockage existed?"
        ]
    },

    // Price / Preço
    price: {
        pt: [
            "Os engajamentos são estruturados com base na complexidade do ambiente e na profundidade do realinhamento necessário — não em horas ou pacotes padronizados.\n\nO primeiro passo é um diagnóstico de contexto. A partir daí, o escopo determina o investimento.\n\n→ Solicitar acesso: intelligence@jannuzzelli.pro",
            "Acesso estratégico não começa com uma proposta de preço — começa com precisão de diagnóstico. Sem entender a profundidade do problema, qualquer número seria arbitrário.\n\n→ Você pode descrever brevemente o seu contexto? Use o protocolo abaixo.",
            "O custo de uma intervenção bem estruturada é sempre menor que o custo do problema que ela resolve. A questão relevante não é quanto custa — é quanto custa não resolver.\n\n→ Qual o impacto estimado de não resolver isso nos próximos 90 dias?"
        ],
        en: [
            "Engagements are structured based on the complexity of the environment and the depth of realignment required — not hours or standardized packages.\n\nThe first step is a context diagnostic. From there, scope determines investment.\n\n→ Request access: intelligence@jannuzzelli.pro",
            "Strategic access doesn't start with a price proposal — it starts with diagnostic precision. Without understanding the depth of the problem, any number would be arbitrary.\n\n→ Can you briefly describe your context? Use the protocol below.",
            "The cost of a well-structured intervention is always lower than the cost of the problem it resolves. The relevant question isn't what it costs — it's what it costs not to resolve.\n\n→ What is the estimated impact of not resolving this in the next 90 days?"
        ]
    },

    // Process / Como Funciona
    process: {
        pt: [
            "O processo começa com um diagnóstico de contexto — não genérico, mas calibrado ao seu ambiente específico. A partir disso, identificamos a variável de controle: o ponto de alavanca que, quando movido, desobstrui o sistema.\n\nFormatos: sessões intensivas, acompanhamento de ciclo ou intervenção pontual de alta precisão.",
            "Fase 1: Diagnóstico e mapeamento do sistema de decisão.\nFase 2: Identificação das variáveis de controle e bloqueadores estruturais.\nFase 3: Reconfiguração da arquitetura cognitiva.\nFase 4: Implementação e verificação de velocidade.\n\n→ Em qual fase você acha que seu sistema mais precisa de intervenção?",
            "Não trabalho com metodologias genéricas aplicadas a contextos específicos. O processo é construído para o problema — não o contrário.\n\n→ O que você já tentou que não funcionou?"
        ],
        en: [
            "The process starts with a context diagnostic — not generic, but calibrated to your specific environment. From there, we identify the control variable: the leverage point that, when moved, unblocks the system.\n\nFormats: intensive sessions, cycle accompaniment, or high-precision targeted intervention.",
            "Phase 1: Diagnosis and mapping of the decision system.\nPhase 2: Identification of control variables and structural blockers.\nPhase 3: Cognitive architecture reconfiguration.\nPhase 4: Implementation and velocity verification.\n\n→ In which phase do you think your system most needs intervention?",
            "I don't work with generic methodologies applied to specific contexts. The process is built for the problem — not the other way around.\n\n→ What have you tried that didn't work?"
        ]
    },

    // Experience / Experiência
    experience: {
        pt: [
            "Atuação em ecossistemas de inovação internacionais: MIT, NASA, Google, Distrito. Organizações premiadas em setores de alta complexidade: financeiro, saúde, tecnologia, consumo e inovação corporativa.",
            "Mais de uma década operando em ambientes onde as ferramentas convencionais de gestão chegam ao seu limite. O diferencial não é o histórico — é a capacidade de ver o que o sistema não consegue ver de dentro.",
            "Os casos documentados no site são fragmentos de intervenções reais. Os setores incluem gestão de ativos, SaaS B2B, redes hospitalares, empresas familiares e hubs de inovação corporativa.\n\n→ Qual setor ou tipo de problema é mais próximo do seu contexto?"
        ],
        en: [
            "Operations in international innovation ecosystems: MIT, NASA, Google, Distrito. Award-winning organizations across high-complexity sectors: financial, healthcare, technology, consumer, and corporate innovation.",
            "Over a decade operating in environments where conventional management tools reach their limit. The differentiator isn't the track record — it's the ability to see what the system cannot see from within.",
            "The documented cases on this site are fragments of real interventions. Sectors include asset management, SaaS B2B, hospital networks, family businesses, and corporate innovation hubs.\n\n→ Which sector or problem type is closest to your context?"
        ]
    },

    // Contact / Contato
    contact: {
        pt: [
            "Canal de acesso estratégico:\n→ intelligence@jannuzzelli.pro\n→ WhatsApp: +55 12 98121-6006\n\nOu use o Protocolo de Acesso abaixo — suas respostas são lidas antes do primeiro contato.",
            "O primeiro contato não é uma call de vendas. É um mapeamento inicial do seu contexto para avaliar se e como uma intervenção faz sentido.\n\n→ Use o formulário abaixo ou escreva diretamente: intelligence@jannuzzelli.pro",
            "Se você chegou até aqui, provavelmente há algo no seu sistema que precisa de reconfiguração. O próximo passo é uma conversa — sem compromisso, com precisão.\n\n→ intelligence@jannuzzelli.pro | +55 12 98121-6006"
        ],
        en: [
            "Strategic access channel:\n→ intelligence@jannuzzelli.pro\n→ WhatsApp: +55 12 98121-6006\n\nOr use the Access Protocol below — your responses are read before the first contact.",
            "The first contact is not a sales call. It's an initial mapping of your context to assess if and how an intervention makes sense.\n\n→ Use the form below or write directly: intelligence@jannuzzelli.pro",
            "If you've gotten here, there's likely something in your system that needs reconfiguration. The next step is a conversation — no commitment, with precision.\n\n→ intelligence@jannuzzelli.pro | +55 12 98121-6006"
        ]
    },

    // Complexity / Complexidade
    complexity: {
        pt: [
            "Complexidade não gerenciada não cresce linearmente — cresce exponencialmente. O que começa como ambiguidade gerenciável se torna, em 6 a 12 meses, paralisia sistêmica.\n\n→ Como sua organização está gerenciando a complexidade hoje?",
            "Alta complexidade não é um problema de informação — é um problema de estrutura de processamento. Com a arquitetura certa, os mesmos dados produzem decisões completamente diferentes.\n\n→ Qual é a sua maior fonte de complexidade não estruturada agora?",
            "Ambientes de alta complexidade requerem arquiteturas de decisão específicas — não frameworks genéricos escalados para cima. O que funciona em ambientes simples destrói ambientes complexos.\n\n→ Qual o seu ambiente de decisão mais crítico?"
        ],
        en: [
            "Unmanaged complexity doesn't grow linearly — it grows exponentially. What starts as manageable ambiguity becomes, in 6 to 12 months, systemic paralysis.\n\n→ How is your organization managing complexity today?",
            "High complexity isn't an information problem — it's a processing structure problem. With the right architecture, the same data produces completely different decisions.\n\n→ What is your biggest source of unstructured complexity right now?",
            "High-complexity environments require specific decision architectures — not generic frameworks scaled up. What works in simple environments destroys complex ones.\n\n→ What is your most critical decision environment?"
        ]
    },

    // Default / Fallback
    fallback: {
        pt: [
            "Sistema cognitivo ativo. O que você digitou não corresponde a um gatilho conhecido — mas isso é interessante.\n\nTente: 'ARAM', 'como funciona', 'preço', 'estratégia', 'decisão', 'complexidade', 'contato'\n\nOu simplesmente descreva o que está travado no seu ambiente agora.",
            "Input registrado. Para navegar este sistema de forma mais eficiente:\n\n→ 'ARAM' — sobre o método\n→ 'processo' — como funciona\n→ 'casos' — resultados reais\n→ 'contato' — próximo passo\n→ 'preço' — estrutura de engajamento",
            "Sinal detectado — frequência não reconhecida. Seja mais específico sobre o que você está buscando: método, processo, resultados, ou quer iniciar um diagnóstico direto?"
        ],
        en: [
            "Cognitive system active. What you typed doesn't correspond to a known trigger — but that's interesting.\n\nTry: 'ARAM', 'how it works', 'price', 'strategy', 'decision', 'complexity', 'contact'\n\nOr simply describe what's stuck in your environment right now.",
            "Input registered. To navigate this system more efficiently:\n\n→ 'ARAM' — about the method\n→ 'process' — how it works\n→ 'cases' — real results\n→ 'contact' — next step\n→ 'price' — engagement structure",
            "Signal detected — unrecognized frequency. Be more specific about what you're looking for: method, process, results, or do you want to initiate a direct diagnostic?"
        ]
    },

    // Language redirect
    langRedirect: {
        // When EN user types PT
        switchToPT: "Detected input in Portuguese.\n\nFor a full experience in your language:\n→ www.jannuzzelli.com.br\n\nContinuing in English...",
        // When PT user types EN
        switchToEN: "Input em inglês detectado.\n\nPara uma experiência completa em inglês:\n→ www.jannuzzelli.pro\n\nContinuando em português..."
    }
};

// ====================== TOPIC DETECTION ======================
function detectTopic(query) {
    const q = query.toLowerCase();

    if (/aram|método|method|framework/.test(q)) return 'aram';
    if (/preço|valor|custo|investimento|quanto|cobr|price|cost|fee|invest|budget/.test(q)) return 'price';
    if (/como funciona|processo|etapa|fase|format|how (does|it|do)|process|phase|step/.test(q)) return 'process';
    if (/estratégia|estratégic|strategy|strategic|planejamento|planning/.test(q)) return 'strategy';
    if (/decisão|decis|travad|bloqueio|stuck|blocked|decision/.test(q)) return 'decision';
    if (/complex|ambigü|incertez|uncertain|chaos/.test(q)) return 'complexity';
    if (/experiência|casos|cases|resultado|result|client|clientes|histórico|track|Mit|NASA|Google/.test(q)) return 'experience';
    if (/contato|contact|email|whatsapp|falar|talk|reach|agendar|schedule|conversa|chat/.test(q)) return 'contact';

    return 'fallback';
}

// ====================== RESPONSE GENERATOR ======================
function generateResponse(query) {
    const lang = detectLanguage(query);
    const topic = detectTopic(query);

    // Language mismatch detection
    if (!isEnglishPage && lang === 'en') {
        memory.push({ query, lang, topic });
        return KB.langRedirect.switchToEN;
    }
    if (isEnglishPage && lang === 'pt') {
        memory.push({ query, lang, topic });
        return KB.langRedirect.switchToPT;
    }

    // Pick variation, avoid repeating same topic consecutively
    const variations = KB[topic][lang];
    let varIndex = 0;

    if (lastTopics.includes(topic)) {
        // Advance to next variation
        const pastCount = lastTopics.filter(t => t === topic).length;
        varIndex = pastCount % variations.length;
    }

    lastTopics.push(topic);
    if (lastTopics.length > 12) lastTopics.shift();

    memory.push({ query, lang, topic });
    interactionCount++;
    cognitiveState.intensity = Math.min(cognitiveState.intensity + 0.3, 5);

    let response = variations[varIndex];

    // Add CTA after 2+ interactions
    if (interactionCount >= 2 && topic !== 'contact') {
        const ctaLines = {
            pt: '\n\n— Para iniciar um diagnóstico real: use o protocolo de acesso abaixo.',
            en: '\n\n— To initiate a real diagnostic: use the access protocol below.'
        };
        if (!response.includes('→')) {
            response += ctaLines[lang];
        }
    }

    return response;
}

// ====================== TERMINAL ======================
const terminalInput = document.getElementById('ai-terminal-input');
const terminalOutput = document.getElementById('ai-terminal-output');
const aiLoader = document.getElementById('ai-loader');
const terminalSubmitBtn = document.getElementById('ai-terminal-submit');

function addTerminalLine(prefix, text, cssClass) {
    if (!terminalOutput) return;
    const line = document.createElement('div');
    line.className = 'terminal-line';

    if (prefix) {
        const pre = document.createElement('span');
        pre.className = 'terminal-line-prefix';
        pre.textContent = prefix;
        line.appendChild(pre);
    }

    const content = document.createElement('span');
    content.className = cssClass || 'terminal-line-sys';
    content.style.whiteSpace = 'pre-wrap';
    line.appendChild(content);

    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    return content;
}

function typeEffect(text, container) {
    return new Promise(resolve => {
        let i = 0;
        const chars = text.split('');
        const interval = setInterval(() => {
            container.textContent += chars[i++];
            if (terminalOutput) terminalOutput.scrollTop = terminalOutput.scrollHeight;
            if (i >= chars.length) {
                clearInterval(interval);
                resolve();
            }
        }, 12);
    });
}

async function processTerminalCommand() {
    if (!terminalInput) return;
    const query = terminalInput.value.trim();
    if (!query) return;

    terminalInput.value = '';
    if (terminalSubmitBtn) terminalSubmitBtn.disabled = true;

    // Add divider
    const divider = document.createElement('div');
    divider.className = 'terminal-divider';
    divider.style.margin = '8px 28px';
    if (terminalOutput) terminalOutput.after ? null : terminalOutput.appendChild(divider);

    // User line
    addTerminalLine('>>', query, 'terminal-line-user');

    // Loader
    if (aiLoader) aiLoader.style.display = 'block';

    // Wait for response
    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

    if (aiLoader) aiLoader.style.display = 'none';

    const response = generateResponse(query);
    const contentEl = addTerminalLine('SYS', '', 'terminal-line-sys');
    if (contentEl) {
        await typeEffect(response, contentEl);
    }

    if (terminalSubmitBtn) terminalSubmitBtn.disabled = false;
    if (terminalInput) terminalInput.focus();
}

// ====================== EVENTS — TERMINAL ======================
if (terminalInput) {
    terminalInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') processTerminalCommand();
    });
}

if (terminalSubmitBtn) {
    terminalSubmitBtn.addEventListener('click', processTerminalCommand);
}

// Hint chips click
document.querySelectorAll('.term-hint-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        if (terminalInput) {
            terminalInput.value = chip.dataset.cmd || chip.textContent.trim();
            processTerminalCommand();
        }
    });
});

// ====================== WHATSAPP ======================
function buildWhatsAppMessage() {
    const type = getUserType();
    const lastEntry = memory.length ? memory[memory.length - 1] : null;
    const lang = lastEntry ? lastEntry.lang : (isEnglishPage ? 'en' : 'pt');
    const lastInput = lastEntry ? lastEntry.query : '';
    const intensity = Math.round(cognitiveState.intensity);

    let msg = lang === 'en'
        ? "Access initiated.\n"
        : "Acesso iniciado.\n";

    if (lastInput) {
        msg += `\nContext: "${lastInput.substring(0, 120)}"`;
    }

    msg += `\n\n[SYS DATA]\nIntensity: ${intensity}\nType: ${type}\nInteractions: ${interactionCount}`;

    return msg;
}

// ====================== CTA HANDLER ======================
function handleCTA(e) {
    e.preventDefault();

    const out = document.getElementById('ai-terminal-output');
    if (out) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = isEnglishPage
            ? '<span class="terminal-line-prefix">SYS</span><span class="terminal-line-sys">Opening channel...</span>'
            : '<span class="terminal-line-prefix">SYS</span><span class="terminal-line-sys">Abrindo canal...</span>';
        out.appendChild(line);
        out.scrollTop = out.scrollHeight;
    }

    setTimeout(() => {
        cognitiveState.intensity = Math.min(cognitiveState.intensity + 1, 5);
        const msg = buildWhatsAppMessage();
        window.open(`https://wa.me/5512981216006?text=${encodeURIComponent(msg)}`, '_blank');
    }, 700);
}

// ====================== CURSOR ======================
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let animId;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cursorDot.style.left = mx + 'px';
        cursorDot.style.top = my + 'px';
    });

    function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top = ry + 'px';
        animId = requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button, .cta, .asm-option, .case-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.width = '48px';
            cursorRing.style.height = '48px';
            cursorRing.style.borderColor = 'rgba(0,196,255,0.6)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.width = '34px';
            cursorRing.style.height = '34px';
            cursorRing.style.borderColor = 'rgba(0,196,255,0.35)';
        });
    });
}

// ====================== BIND CTAs ======================
document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', handleCTA);
});

// ====================== REVEAL ON SCROLL ======================
if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.profile-section, .content-enhancement-section, .ai-terminal-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        obs.observe(el);
    });

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.visible').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
}

// CSS animation helper
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
});

console.log("🧠 Cognitive System v2.0 ACTIVE");