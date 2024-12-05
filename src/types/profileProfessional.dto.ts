
import { User } from "./user.dto";
import { patientDto } from "./patients.dto";

export interface ProfileProfessionalDto {
    id?: number;
    description: string;
    availability: boolean;
    preference_communication: string;
    professionalId?: number;
    professional?: ProfessionalDto;
}

export interface ProfessionalDto {
    id: number;
    firstname: string;
    lastname: string;
    title: string;
    specialization: string;
    tuition: number;
    birthdate: string;
    userId: number;
    user?: User;
    patient?: Array<patientDto>;
    turnOfAttention: string;
}