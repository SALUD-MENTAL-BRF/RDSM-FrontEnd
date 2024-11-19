export interface logicalProblemResponseDto {
    problema: string;
    respuestas: Array<string>;
    correcta: string;
    explicacion:string
}


export interface logicalProblemSettingDto{
  id?: number;
  complexity: string;
  theme: string;
  problem_type: string
}