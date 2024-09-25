import { User } from "./user.dto";


export interface patient {
    id: number;
    fullname: string;
    user: User;
}

export interface formPatientDto {
    fullName: string;
    date_birth: string;
    genre: string;
    address: string;
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
  }
  