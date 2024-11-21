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

export interface logicalProblemHistoryDto {
  id: number;
  problem: string;
  responses: Array<string>;
  explanation: string;
  complexity: string;
  answer: number
  correctResponse: string;
  professionalid: number;
  patientId: number;
  createdAt: string;
};