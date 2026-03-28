// ====================== JANNUNZELLI COGNITIVE CORE v1.0 ======================
// BILINGUAL APPLIED FRAMEWORK: ARAM METHOD (EN/PT)

const DATABASE = {
    EN: {
        aram: "The ARAM Method (est. 2020) is a proprietary applied framework for strategic clarity and structural realignment in high-complexity environments. It functions as the cognitive architecture behind my advisory work, integrating decision science and systems reasoning.",
        context: "ARAM is activated during structural uncertainty, high-stakes decision environments, and leadership inflection points where conventional models prove insufficient.",
        nature: "It is not a standalone venture, but a portable decision architecture embedded in professional advisory engagements.",
        pricing: "Advisory engagements are structured based on the complexity of the environment and the depth of structural realignment required. Contact for strategic access.",
        strategy: "Strategic architecture isn't about advice—it's about reconfiguring the cognitive matrix where decisions are formed. We eliminate noise to reveal the control variable.",
        default: "System Analysis: Input detected. For high-stakes strategic alignment or structural uncertainty, please initialize a direct advisory protocol."
    },
    PT: {
        aram: "O Método ARAM (est. 2020) é um framework aplicado proprietário para clareza estratégica e realinhamento estrutural em ambientes de alta complexidade. Opera como a arquitetura cognitiva por trás do meu trabalho de assessoria.",
        context: "O ARAM é ativado em contextos de incerteza estrutural, decisões de alto risco e pontos de inflexão de liderança onde modelos convencionais são insuficientes.",
        nature: "Não é uma iniciativa independente, mas uma arquitetura de decisão portátil integrada em engajamentos de assessoria profissional.",
        pricing: "Os engajamentos são estruturados com base na complexidade do ambiente e na profundidade do realinhamento necessário. Solicite acesso para análise de viabilidade.",
        strategy: "Arquitetura estratégica não é sobre conselhos—é sobre reconfigurar a matriz cognitiva onde as decisões são formadas. Eliminamos o ruído para revelar a variável de controle.",
        default: "Análise do Sistema: Input detectado. Para alinhamento estratégico de alto risco ou incerteza estrutural, favor iniciar protocolo de assessoria direta."
    }
};

export function fakeAIResponse(input) {
    const text = input.toLowerCase();

    // Detector de Idioma Simples
    const isEnglish = /strategy|method|price|how|work|clear|uncertainty|high|leadership/.test(text);
    const lang = isEnglish ? 'EN' : 'PT';
    const db = DATABASE[lang];

    // Mapeamento de Gatilhos Bilíngues
    if (text.includes("aram") || text.includes("método") || text.includes("method")) return db.aram;
    if (text.includes("context") || text.includes("uncertainty") || text.includes("incerteza") || text.includes("risco")) return db.context;
    if (text.includes("nature") || text.includes("venture") || text.includes("projeto") || text.includes("comunidade")) return db.nature;
    if (text.includes("price") || text.includes("value") || text.includes("preço") || text.includes("valor") || text.includes("quanto")) return db.pricing;
    if (text.includes("strategy") || text.includes("estratégia") || text.includes("decisão") || text.includes("decision")) return db.strategy;

    return db.default;
}