import { User } from "./user.dto";
import { localityDto } from "./locality.dto";

export interface patient {
    id: number;
    fullname: string;
    user: User;
}

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
  