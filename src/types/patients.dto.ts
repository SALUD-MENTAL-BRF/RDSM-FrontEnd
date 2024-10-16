import { User } from "./user.dto";
import { localityDto } from "./locality.dto";

export interface patientDto {
    id: number;
    fullName: string;
    date_birth: string;
    genre: string;
    telephone: string;
    contactEmergencyName: string;
    contactEmergencyRelation: string;
    contactEmergencyTelephone: string;
    streetNumber: string;
    neighborhood: string;
    userId: number;
    localityId: number;
    user?: User;
    locality?: localityDto;
}

export interface InfoPatientDto {
    reasonConsultation: string;
    descriptionProblem: string;
    diagnosesPrevious: string;
    treatmentsPrevious: string;
    hospitalizationsPrevious: string;
    meciationCurrent: string;
    historyConsumption: string;
    historyDiseases: string;
    histoyFamily: string;
    patientId?: number;
    professionalId?: number;
};

export interface formPatientDto {
    id?: number;
    fullName: string;
    date_birth: string;
    genre: string;
    telephone: string;
    contactEmergencyName: string;
    contactEmergencyRelation: string;
    contactEmergencyTelephone: string;
    reasonConsultation: string;
    descriptionProblem: string;
    diagnosesPrevious: string;
    treatmentsPrevious: string;
    hospitalizationsPrevious: string;
    meciationCurrent: string;
    historyConsumption: string;
    historyDiseases: string;
    histoyFamily: string;
    userId?: number;
    professionalId?: number;
    user?: User;
    localityId: number | null;
    streetNumber: string;
    neighborhood: string;
    locality?: localityDto
  }
  