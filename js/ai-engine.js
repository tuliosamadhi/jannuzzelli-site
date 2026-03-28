async function runAIQualification() {
    const score = getIntentScore();

    let profile = "iniciante";

    if (score > 80) profile = "decisor";
    else if (score > 60) profile = "interessado";

    const prompt = `
Você é um consultor estratégico de elite.

Perfil do visitante: ${profile}

Objetivo:
- gerar resposta curta
- provocar desejo
- levar para WhatsApp

Sem explicações longas.
    `;

    const response = await askGemini(prompt);

    return response;
}