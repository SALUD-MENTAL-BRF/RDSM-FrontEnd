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