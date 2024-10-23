export const fetchSocialHability = async (genre: string, stage: string) => {
    const data = await fetch(`${import.meta.env.VITE_API_URL_IA}hability-social`, {
        method: 'POST',
        body: JSON.stringify({ genre: genre, stage: stage }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const response = await data.json();
    const answer = response.answer;


    const escenarioMatch = answer.match(/Escenario\s*:\s*(.*?)(?=\n{2,})/i);
    const respuestasMatch = answer.match(/Respuestas\s*:\s*([\s\S]*?)(?=\n{2,}|Correcta\s*:)/i);
    const correctaMatch = answer.match(/Correcta\s*:\s*(\d+)/i);

    if (!escenarioMatch || !respuestasMatch || !correctaMatch) {
        throw new Error("La respuesta no tiene la estructura esperada.");
    }


    const escenario = escenarioMatch[1].trim();


    const respuestas = respuestasMatch[1]
        .trim()
        .split('\n')
        .map((res:any) => res.trim().replace(/^\d+\)\s*/, '')) 
        .filter((res:any) => res !== ''); 


    const correcta = correctaMatch[1].trim();


    const resultadoEstructurado = {
        escenario: escenario,
        respuestas: respuestas,
        correcta: correcta
    };

    return resultadoEstructurado;
};
