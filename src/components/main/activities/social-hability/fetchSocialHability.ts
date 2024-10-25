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
    

   
    const escenarioMatch = answer.match(/(Escenario|Escenario Social)\s*:\s*(.*?)(?=\n{2,})/i);
    const respuestasMatch = answer.match(/Respuestas\s*:\s*([\s\S]*?)(?=\n{2,}|Correcta\s*:)/i);
    const correctaMatch = answer.match(/Correcta\s*:\s*(\d+)/i);

  
    if (!escenarioMatch || !respuestasMatch || !correctaMatch) {
        console.error("Estructura inesperada en la respuesta", { respuesta: answer });
        throw new Error("La respuesta no tiene la estructura esperada.");
    }


    const escenario = escenarioMatch[2].trim().replace(/^"|"$/g, '');


    const respuestas = respuestasMatch[1]
        .trim()
        .split('\n')
        .map((res:any) => res.trim().replace(/^\d+\)\s*/, ''))
        .filter((res:any) => res !== '');  

  
    if (respuestas.length < 2) {
        console.error("No hay suficientes respuestas en la respuesta proporcionada", { respuestas });
        throw new Error("La respuesta no tiene suficientes opciones.");
    }

    const correcta = correctaMatch[1].trim();

    const resultadoEstructurado = {
        escenario: escenario,
        respuestas: respuestas,
        correcta: correcta
    };

    return resultadoEstructurado;
};
