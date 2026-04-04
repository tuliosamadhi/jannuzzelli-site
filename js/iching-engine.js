// ====================== ICHING ENGINE - CAMADA INVISÍVEL (ULTRA-PREMIUM C-LEVEL) ======================

export class IchingEngine {
    constructor() {
        this.hexagrams = this.loadHexagramDatabase();
    }

    castHexagram() {
        const lines = [];
        for (let i = 0; i < 6; i++) {
            lines.push(Math.floor(Math.random() * 4) + 6); // 6,7,8,9
        }
        return lines;
    }

    getHexagramData(lines) {
        const primary = lines.map(line => (line === 6 || line === 8) ? 0 : 1);
        const mutated = lines.map(line => {
            if (line === 6) return 1;
            if (line === 9) return 0;
            return line === 7 ? 1 : 0;
        });

        return {
            primary: primary.join(''),
            mutated: mutated.join(''),
            changingLines: lines.map((l, i) => (l === 6 || l === 9) ? i + 1 : 0).filter(Boolean),
            intensity: lines.filter(l => l === 6 || l === 9).length
        };
    }

    // Interpretação refinada para nicho C-Level ultra-premium
    generateCognitiveResponse(hexData, userType, userInput) {
        const hasStrongMutation = hexData.intensity >= 3;
        const isTransition = hexData.changingLines.length > 0;

        let coreInsight = "";

        if (userType === "decisor") {
            coreInsight = hasStrongMutation
                ? "O padrão indica que o ponto de decisão estratégica já foi ultrapassado. Manter a arquitetura atual de governança expõe a organização a riscos institucionais significativos. É necessário reestruturar os frameworks executivos de decisão com urgência."
                : "A estrutura revela clareza suficiente para ação executiva imediata. O verdadeiro risco reside na desconexão entre decisão de C-Level e capacidade de execução institucional.";
        }
        else if (userType === "analitico") {
            coreInsight = "O desalinhamento identificado não reside nos dados ou na tecnologia, mas na arquitetura cognitiva que organiza tanto a percepção quanto a governança. A mutação aponta para a necessidade de consolidar estruturas institucionais antes de qualquer iniciativa de integração digital ou transformação.";
        }
        else if (userType === "morno") {
            coreInsight = "A organização encontra-se no limiar entre estabilidade controlada e transformação coerente. A arquitetura atual ainda protege a execução, porém exige realinhamento profundo entre cultura organizacional, frameworks de decisão e sistemas de performance.";
        }
        else {
            coreInsight = "O sistema detecta hesitação estrutural no nível executivo. Antes de avançar em qualquer projeto de integração digital, reestruturação empresarial ou consolidação de dados, é essencial redefinir os frameworks de decisão de C-Level e a governança institucional.";
        }

        let provocation = "";
        if (hasStrongMutation) {
            provocation = " Transformações superficiais ou iniciativas digitais isoladas não serão suficientes. O que se exige é uma reconfiguração fundamental da arquitetura cognitiva e de governança, capaz de proteger a execução em ambientes de alta complexidade e gerar valor sustentável.";
        } else if (isTransition) {
            provocation = " A coerência entre estratégia declarada e execução real será o fator decisivo nos próximos ciclos. Arquiteturas que perduram são aquelas que alinham responsabilidade estratégica, cultura institucional e infraestrutura tecnológica.";
        } else {
            provocation = " A sustentabilidade do modelo depende da capacidade de traduzir infraestrutura tecnológica em valor institucional duradouro.";
        }

        return coreInsight + provocation;
    }
}

export const iching = new IchingEngine();