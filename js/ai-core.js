export function fakeAIResponse(input) {
    const text = input.toLowerCase();

    if (text.includes("preço") || text.includes("valor") || text.includes("custo")) {
        return "Os projetos são totalmente personalizados. Preciso entender seu contexto primeiro.";
    }
    if (text.includes("como funciona") || text.includes("método")) {
        return "Trabalho na interseção entre arquitetura estratégica e sistemas cognitivos.";
    }
    if (text.includes("ia") || text.includes("inteligência")) {
        return "A IA só entrega valor quando a estrutura cognitiva do líder está alinhada.";
    }

    return "Processando padrões... identificando variáveis ocultas...";
}