export interface socialHabilityResponseDto {
    escenario: string;
    respuestas: Array<string>;
    correcta: string;
    explicacion:string
}

export interface socialHabilitySettingDto {
    id?: number;
    age: string;
    genre: string;
    complexity: string;
    personality: string;
};

export interface socialHabilityHistoryDto{
    id: number;
    stage: string;
    responses: Array<string>;
    explanation: string;
    complexity: string;
    answer: number
    correctResponse: string;
    professionalid: number;
    patientId: number;
    createdAt: string;
};