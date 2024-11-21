import { logicalProblemSettingDto } from "../../../../types/activity/logicalProblem.dto";


export const fetchLogicalProblem = async (setting: logicalProblemSettingDto) => {
    const data = await fetch(`${import.meta.env.VITE_API_URL_IA}logical-problem`, {
        method: 'POST',
        body: JSON.stringify(setting),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response = await data.json();
    const answer = response.answer;

    // Ajustamos la extracción de cada sección
    const problemaMatch = answer.match(/Problema\s*:\s*([\s\S]*?)(?=\nRespuestas|$)/i);
    const respuestasMatch = answer.match(/Respuestas\s*:\s*([\s\S]*?)(?=\nCorrecta|$)/i);
    const correctaMatch = answer.match(/Correcta\s*:\s*(\d+)/i);
    const explicacionMatch = answer.match(/Explicación\s*:\s*([\s\S]*?)(?=$|$)/i);

    if (!problemaMatch || !respuestasMatch || !correctaMatch) {
        console.error("Estructura inesperada en la respuesta", { respuesta: answer });
        throw new Error("La respuesta no tiene la estructura esperada.");
    }

    const problema = problemaMatch[1].trim();

    const respuestas = respuestasMatch[1]
        .trim()
        .split('\n')
        .map((res: string) => res.trim().replace(/^\d+\)\s*/, ''))
        .filter((res: string) => res !== '');

    if (respuestas.length < 2) {
        console.error("No hay suficientes respuestas en la respuesta proporcionada", { respuestas });
        throw new Error("La respuesta no tiene suficientes opciones.");
    }

    const correcta = correctaMatch[1].trim();
    const explicacion = explicacionMatch ? explicacionMatch[1].trim() : null;

    const resultadoEstructurado = {
        problema,
        respuestas,
        correcta,
        explicacion,
    };

    return resultadoEstructurado;
};
